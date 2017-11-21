class Register {
    constructor(rootNode) {
        this.root = rootNode;
    }

    render() {
        const root = this.root;
        const input = document.createElement('input');
        const btn = document.createElement('button');

        btn.innerText = 'Create User';
        btn.onclick = this.clickHandler.bind(this);

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
