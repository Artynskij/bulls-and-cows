export const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
        if (key === 'className') {
            node.className = String(value);
        }
        else if (key === 'textContent') {
            node.textContent = String(value);
        }
        else if (typeof value === 'boolean') {
            if (value)
                node.setAttribute(key, '');
        }
        else {
            node.setAttribute(key, String(value));
        }
    }
    for (const child of children) {
        if (child === null || child === undefined)
            continue;
        node.append(typeof child === 'string' ? document.createTextNode(child) : child);
    }
    return node;
};
export const mount = (parent, ...children) => {
    parent.replaceChildren(...children);
};
//# sourceMappingURL=dom.js.map