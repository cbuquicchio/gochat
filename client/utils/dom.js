export function createElement(tagName, attrs={}) {
    const elem = document.createElement(tagName);

    for (let key in attrs) {
        elem[key] = attrs[key];
    }

    return elem;
}
