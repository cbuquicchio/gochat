class Chat {
    constructor(rootNode) {
        this.root = rootNode;
    }

    render() {
        const root = this.root;
        const input = document.createElement('input');
        const button = document.createElement('button');
        const msgList = document.createElement('ul');

        button.innerText = 'Submit';
        button.onclick = this.clickHandler;
        input.onkeydown = this.enterHandler;

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
