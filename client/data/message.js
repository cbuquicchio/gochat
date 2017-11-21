class Message {
    constructor(username, txt) {
        this.data = txt;
        this.username = username;
    }

    serialize() {
        return JSON.stringify(this);
    }

    static deserialize(json) {
        const raw = JSON.parse(json);
        return new Message(raw.user, raw.data);
    }
}

export default Message;
