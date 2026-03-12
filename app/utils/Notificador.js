const WebSocket = require("ws");

class Notificador {

    constructor(wss) {
        this.wss = wss;
    }

    notificar(dados) {
        this.wss.clients.forEach(cliente => {
            if (cliente.readyState === WebSocket.OPEN) {
                cliente.send(JSON.stringify(dados));
            }
        });
    }

}

module.exports = Notificador;