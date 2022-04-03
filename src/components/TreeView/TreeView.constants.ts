import { TreeViewContextValue } from './TreeView.context';

export const TREE_VIEW_CONTEXT_DEFAULT_VALUE: TreeViewContextValue = {
    multiSelect: false,
    expandIcon: () => null,
    collapseIcon: () => null,
    focusedElementRef: { current: null },
    isSelected: () => false,
    isFocused: () => false,
    isExpanded: () => false,
    onMouseDown: () => {},
};
