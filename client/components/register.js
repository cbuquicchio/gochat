/* Utils */
import { createElement } from '../utils/dom.js';

class Register {
    constructor(rootNode) {
        this.root = rootNode;
    }

    render() {
        const root = this.root;
        const input = createElement('input');
        const btn = createElement('button',
            { innerText: 'Create User',
                onclick: this.clickHandler.bind(this) });

        root.appendChild(input);
        root.appendChild(btn);
    }

    destroy() {
        this.root.innerHTML = "";
    }

    clickHandler() {
        throw new Error('Not implemented.');
    }
}

export default Register;
