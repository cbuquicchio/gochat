/* Utils */
import { createElement } from '../utils/dom.js';

class Chat {
    constructor(rootNode) {
        this.root = rootNode;
    }

    render() {
        const root = this.root;
        const button = createElement('button',
                { innerText: 'Submit', onclick: this.clickhHandler });

        const input = createElement('input', { onkeydown: this.enterHandler });
        const msgList = createElement('ul');

        root.appendChild(msgList);
        root.appendChild(input)
        root.appendChild(button);
    }

    destroy() {
        this.root.innerHTML = "";
    }

    clickHandler() {
        throw new Error('Not implemented.');
    }

    enterHandler() {
        throw new Error('Not implemented.');
    }
}

export default Chat;
