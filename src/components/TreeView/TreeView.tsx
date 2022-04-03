import {
    useState,
    useRef,
    useCallback,
    FocusEventHandler,
    KeyboardEventHandler,
    ReactNode,
    ComponentType,
    MouseEventHandler,
} from 'react';
import { block } from 'bem-cn';

import { TreeNode, TreeNodeProps } from '../TreeNode';

import { TreeViewContext } from './TreeView.context';
import { isLiElement, isUlElement } from './TreeView.typeguards';

import './TreeView.css';

const b = block('TreeView');

export type LabelComponentProps = Omit<TreeNodeProps, 'children'> & {
    focused: boolean;
    selected: boolean;
    expandable: boolean;
    expanded: boolean;
    icon: ReactNode;
};

export type TreeViewProps = {
    /** Структура дерева */
    nodes: TreeNodeProps[];

    /** Список id раскрытых элементов */
    expanded: string[];

    /** Список id выбранных элементов */
    selected: string[] | string;

    /** Включить множественный выбор */
    multiSelect?: boolean;

    /*** Иконка для нераскрытого элемента */
    expandIcon: ReactNode;

    /*** Иконка для раскрытого элемента */
    collapseIcon: ReactNode;

    /*** Компонент для переопределения рендера лейбла */
    LabelComponent?: ComponentType<LabelComponentProps>;

    /** Обработчик открытия/закрытия parent-узла дерева */
    onToggle?: (expanded: string[]) => void;

    /** Обработчик выбора узла дерева */
    onSelect?: (selected: string[] | string) => void;
};

export const TreeView = (props: TreeViewProps) => {
    const {
        expanded,
        selected,
        multiSelect = false,
        expandIcon,
        collapseIcon,
        nodes,
        LabelComponent,
        onToggle,
        onSelect,
    } = props;

    const [focusedNodeId, setFocusedNodeId] = useState<string>();
    const focusedElementRef = useRef<HTMLLIElement>(null);

    const isFocused = useCallback((nodeId) => nodeId === focusedNodeId, [focusedNodeId]);
    const isExpanded = useCallback((nodeId) => expanded.includes(nodeId), [expanded]);
    const isSelected = useCallback(
        (nodeId) => (Array.isArray(selected) ? selected.includes(nodeId) : nodeId === selected),
        [selected],
    );

    const selectNode = useCallback(
        (nodeId: string) => {
            if (!onSelect) {
                return;
            }

            const performSelect = (newValue: string | string[]) => {
                onSelect(newValue);
                setFocusedNodeId(nodeId);
            };

            if (multiSelect) {
                if (!Array.isArray(selected)) {
                    performSelect([nodeId]);

                    return;
                }

                if (isSelected(nodeId)) {
                    performSelect(selected.filter((id) => nodeId !== id));

                    return;
                }

                performSelect([...selected, nodeId]);

                return;
            }

            if (isSelected(nodeId)) {
                performSelect('');

                return;
            }

            performSelect(nodeId);
        },
        [selected, multiSelect, onSelect, isSelected],
    );

    const toggleNode = useCallback(
        (nodeId: string) => {
            if (!onToggle) {
                return;
            }

            if (isExpanded(nodeId)) {
                onToggle(expanded.filter((id) => nodeId !== id));

                return;
            }

            onToggle([...expanded, nodeId]);
        },
        [expanded, onToggle, isExpanded],
    );

    const handleNodeMouseDown: MouseEventHandler<HTMLLIElement> = useCallback(
        (event) => {
            let element = event.target as HTMLElement | null;

            while (element && !isLiElement(element)) {
                element = element.parentElement;
            }

            if (isLiElement(element)) {
                selectNode(element.id);
                toggleNode(element.id);
            }

            event.preventDefault();
            event.stopPropagation();
        },
        [selectNode, toggleNode],
    );

    const handleTreeFocus: FocusEventHandler<HTMLUListElement> = useCallback(() => {
        const firstSelected = Array.isArray(selected) ? selected[0] : selected;

        setFocusedNodeId(firstSelected ?? nodes[0]?.id);
    }, [selected, nodes]);

    const handleArrowDown = useCallback(() => {
        if (!focusedElementRef.current) {
            return;
        }

        let element = focusedElementRef.current;

        // Сначала пытаемся спуститься по дереву "вниз"
        while (element && element.children.length > 1) {
            if (!isUlElement(element.children[1]) || !isLiElement(element.children[1].firstElementChild)) {
                break;
            }

            element = element.children[1].firstElementChild;
        }

        // Если не получилось, то поднимаемся по дереву "вверх"
        if (element === focusedElementRef.current) {
            while (element && !element.nextElementSibling && element.parentElement) {
                if (!isUlElement(element.parentElement) || !isLiElement(element.parentElement.parentElement)) {
                    break;
                }

                element = element.parentElement.parentElement;
            }

            if (isLiElement(element.nextElementSibling)) {
                element = element.nextElementSibling;
            }
        }

        setFocusedNodeId(element.id);
    }, []);

    const handleArrowUp = useCallback(() => {
        if (!focusedElementRef.current) {
            return;
        }

        let element = focusedElementRef.current;

        // Если есть сосед сверху на том же уровне, то фокусим самый "глубокий" последний элемент этого соседа
        if (isLiElement(element.previousElementSibling)) {
            element = element.previousElementSibling;

            while (element && element.children.length > 1) {
                if (!isUlElement(element.children[1]) || !isLiElement(element.children[1].lastElementChild)) {
                    break;
                }

                element = element.children[1].lastElementChild;
            }

            setFocusedNodeId(element.id);

            return;
        }

        // Если соседа слева нет, то фокусим родительский элемент
        if (isUlElement(element.parentElement) && isLiElement(element.parentElement.parentElement)) {
            setFocusedNodeId(element.parentElement.parentElement.id);

            return;
        }
    }, []);

    const handleArrowRight = useCallback(() => {
        const element = focusedElementRef.current;

        if (!element || element.dataset.expandable === 'false') {
            return;
        }

        // Если не раскрыт, то раскрываем
        if (element.getAttribute('aria-expanded') === 'false') {
            toggleNode(element.id);

            return;
        }

        // Иначе переходим на первого потомка
        if (isUlElement(element.children[1]) && isLiElement(element.children[1].firstElementChild)) {
            setFocusedNodeId(element.children[1].firstElementChild.id);
        }
    }, [toggleNode]);

    const handleArrowLeft = useCallback(() => {
        const element = focusedElementRef.current;

        if (!element) {
            return;
        }

        // Если раскрыт, то закрываем
        if (element.getAttribute('aria-expanded') === 'true') {
            toggleNode(element.id);

            return;
        }

        // Иначе переходим на родительский элемент
        if (isUlElement(element.parentElement) && isLiElement(element.parentElement.parentElement)) {
            setFocusedNodeId(element.parentElement.parentElement.id);
        }
    }, [toggleNode]);

    const handleEnter = useCallback(() => {
        const element = focusedElementRef.current;

        if (!element) {
            return;
        }

        if (!element || element.dataset.expandable === 'false') {
            selectNode(element.id);

            return;
        }

        toggleNode(element.id);
    }, [selectNode, toggleNode]);

    const handleSpace = useCallback(() => {
        const element = focusedElementRef.current;

        if (!element) {
            return;
        }

        selectNode(element.id);
    }, [selectNode]);

    const handleTreeKeyDown: KeyboardEventHandler<HTMLUListElement> = useCallback(
        (event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) {
                return;
            }

            switch (event.key) {
                case 'ArrowDown':
                    handleArrowDown();
                    break;

                case 'ArrowUp':
                    handleArrowUp();
                    break;

                case 'ArrowRight':
                    handleArrowRight();
                    break;

                case 'ArrowLeft':
                    handleArrowLeft();
                    break;

                case 'Enter':
                    handleEnter();
                    break;

                case ' ':
                    handleSpace();
                    break;
            }

            event.preventDefault();
        },
        [handleArrowDown, handleArrowUp, handleArrowRight, handleArrowLeft, handleEnter, handleSpace],
    );

    return (
        <TreeViewContext.Provider
            value={{
                multiSelect,
                expandIcon,
                collapseIcon,
                focusedElementRef,
                isSelected,
                isExpanded,
                isFocused,
                LabelComponent,
                onMouseDown: handleNodeMouseDown,
                onSelect: selectNode,
                onToggle: toggleNode,
            }}
        >
            <ul
                className={b()}
                role="tree"
                tabIndex={0}
                aria-multiselectable={multiSelect}
                aria-activedescendant={focusedNodeId}
                onFocus={handleTreeFocus}
                onKeyDown={handleTreeKeyDown}
            >
                {nodes.map((node) => (
                    <TreeNode key={node.id} {...node} />
                ))}
            </ul>
        </TreeViewContext.Provider>
    );
};
