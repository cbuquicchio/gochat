/* Models */
import Connection from './data/connection.js';
import Message from './data/message.js';

/* Components */
import RegisterForm from './components/register.js';
import ChatForm from './components/chat.js';

class Application {
    constructor() {
        this.root = document.getElementById('app');
        this.activeComponent = new RegisterForm(this.root);
        this.activeComponent.clickHandler = this.connectUsrHandler.bind(this);
        this.activeComponent.render();
    }

    connectUsrHandler() {
        const [input] = document.getElementsByTagName('input');
        if (!input) {
            throw new Error('Input element not found.');
        }

        const usrName = input.value.trim();
        if (usrName.length > 0) {
            this.conn = new Connection(`ws://localhost:8080/ws?user=${usrName}`);
            this.conn.onopen = () =>  {
                this.activeComponent.destroy();
                this.activeComponent = new ChatForm(this.root);
                this.activeComponent.clickHandler = this.clickHandler.bind(this);
                this.activeComponent.enterHandler = this.enterHandler.bind(this);
                this.activeComponent.render();
            };
            this.conn.onmessage = this.messageHandler.bind(this);
        }

        input.value = "";
    }

    renderMessage(message) {
        const item = document.createElement('li');
        const [list] = document.getElementsByTagName('ul');
        if (!list) {
            throw new Error('Message List not found.');
        }

        item.innerText = `${message.username}: ${message.data}`
        list.appendChild(item);
    }

    clickHandler() {
        const [input] = document.getElementsByTagName('input');
        if (!input) {
            throw new Error ('Input element not found.');
        }

        const msg = new Message(null, input.value);
        this.conn.send(msg.serialize());
        input.value = "";
    }

    enterHandler(e) {
        if (e.keyCode != 13 /* Enter */) {
            return;
        }

        this.clickHandler();
    }

    messageHandler(msgEvent) {
        const msg = Message.deserialize(msgEvent.data);
        this.renderMessage(msg);
    }

    openConnHandler() {
        console.log('Connection Open');
    }
}

new Application();  /* Boot app */
