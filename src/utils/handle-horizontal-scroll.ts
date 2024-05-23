
export function detectScrollType() {
    let cachedType = 'default';
    const dummy = document.createElement('div');
    const container = document.createElement('div');
    container.style.width = '10px';
    container.style.height = '1px';
    dummy.appendChild(container);
    dummy.dir = 'rtl';
    dummy.style.fontSize = '14px';
    dummy.style.width = '4px';
    dummy.style.height = '1px';
    dummy.style.position = 'absolute';
    dummy.style.top = '-1000px';
    dummy.style.overflow = 'scroll';
    document.body.appendChild(dummy);
    if (dummy.scrollLeft > 0) {
        cachedType = 'default';
    } else {
        dummy.scrollLeft = 1;
        if (dummy.scrollLeft === 0) {
            cachedType = 'negative';
        }
    }
    document.body.removeChild(dummy);
    return cachedType;
}

export function getNormalizedScrollLeft(element: any, direction: any) {
    const scrollLeft = element.scrollLeft;

    // Perform the calculations only when direction is rtl to avoid messing up the ltr behavior
    if (direction !== 'rtl') {
        return scrollLeft;
    }
    const type = detectScrollType();
    switch (type) {
        case 'negative':
            return element.scrollWidth - element.clientWidth + scrollLeft;
        case 'reverse':
            return element.scrollWidth - element.clientWidth - scrollLeft;
        default:
            return scrollLeft;
    }
}
