import { useContext, useRef } from 'react';
import { block } from 'bem-cn';

import { TreeViewContext } from '../TreeView/TreeView.context';
import { mergeRefs } from '../../utils/merge-refs';
import { TreeLabel } from '../TreeLabel';

import { getAriaSelectedProp } from './TreeNode.helpers';

import './TreeNode.css';

export type TreeNodeProps = {
    id: string;
    label: string;
    disabled?: boolean;
    children?: TreeNodeProps[];
};

const b = block('TreeNode');

export const TreeNode = (props: TreeNodeProps) => {
    const { id, label, disabled = false, children } = props;

    const ref = useRef<HTMLLIElement>(null);
    const {
        multiSelect,
        expandIcon,
        collapseIcon,
        focusedElementRef,
        isExpanded,
        isSelected,
        isFocused,
        onMouseDown,
        LabelComponent = TreeLabel,
    } = useContext(TreeViewContext);

    const refs = mergeRefs(isFocused(id) ? [ref, focusedElementRef] : [ref]);

    const expandable = Array.isArray(children) && children.length > 0;
    const expanded = isExpanded(id);
    const focused = isFocused(id);
    const selected = isSelected(id);

    const icon = expanded ? expandIcon : collapseIcon;

    return (
        <li
            ref={refs}
            id={id}
            className={b()}
            role="treeitem"
            aria-disabled={disabled}
            aria-selected={getAriaSelectedProp(multiSelect, disabled, selected)}
            aria-expanded={expandable ? expanded : undefined}
            data-expandable={expandable}
            data-testid={id}
            onMouseDown={onMouseDown}
        >
            <LabelComponent
                id={id}
                label={label}
                disabled={disabled}
                focused={focused}
                selected={selected}
                expandable={expandable}
                expanded={expanded}
                icon={icon}
            />

            {expandable && expanded && (
                <ul className={b('Children')} role="group">
                    {children.map((node) => (
                        <TreeNode key={node.id} {...node} />
                    ))}
                </ul>
            )}
        </li>
    );
};
