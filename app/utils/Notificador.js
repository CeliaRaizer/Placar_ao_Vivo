class Notificador {

    constructor(wss) {
        this.wss = wss;
    }

    notificar(dados) {

        this.wss.clients.forEach(cliente => {

            if (cliente.readyState === 1) {
                cliente.send(JSON.stringify(dados));
            }

        });

    }

}

module.exports = Notificador;