class Connection {
    constructor(url) {
        this.url = url;
        this.ws = new WebSocket(url);
    }

    set onmessage(handler) {
        this.ws.onmessage = handler;
    }

    set onopen(handler) {
        this.ws.onopen = handler;
    }

    set onclose(handler) {
        this.ws.onclose = handler;
    }

    send(dataModel) {
        const raw = dataModel.serialize ? dataModel.serialize() : dataModel;

        this.ws.send(raw);
    }
}

export default Connection;
