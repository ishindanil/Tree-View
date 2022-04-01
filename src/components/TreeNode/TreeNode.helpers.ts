export function getAriaSelectedProp(multiSelect: boolean, disabled: boolean, selected: boolean) {
    if (disabled) {
        return;
    }

    if (multiSelect) {
        return selected;
    }

    return selected || undefined;
}