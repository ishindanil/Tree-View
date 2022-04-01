import { ComponentType, createContext, MouseEventHandler, ReactNode, RefObject } from 'react';

import { TREE_VIEW_CONTEXT_DEFAULT_VALUE } from './TreeView.constants';
import { LabelComponentProps } from './TreeView';

export type TreeViewContextValue = {
    LabelComponent?: ComponentType<LabelComponentProps>;
    multiSelect: boolean;
    focusedElementRef: RefObject<HTMLLIElement>;
    collapseIcon: ReactNode;
    expandIcon: ReactNode;
    isSelected: (nodeId: string) => boolean;
    isFocused: (nodeId: string) => boolean;
    isExpanded: (nodeId: string) => boolean;
    onMouseDown: MouseEventHandler<HTMLLIElement>;
    onSelect: (nodeId: string) => void;
    onToggle: (nodeId: string) => void;
};

export const TreeViewContext = createContext<TreeViewContextValue>(TREE_VIEW_CONTEXT_DEFAULT_VALUE);
