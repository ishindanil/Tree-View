export function isUlElement(element: Element | null): element is HTMLUListElement {
    return element?.tagName === 'UL';
}

export function isLiElement(element: Element | null): element is HTMLLIElement {
    return element?.tagName === 'LI';
}
