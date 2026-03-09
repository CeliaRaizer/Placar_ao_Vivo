class JogoController {

    constructor(jogo, notificador) {
        this.jogo = jogo;
        this.notificador = notificador;
    }

    golA(req, res) {

        this.jogo.golTimeA();

        this.notificador.notificar(this.jogo.obterDados());

        res.json({ ok: true });
    }

    golB(req, res) {

        this.jogo.golTimeB();

        this.notificador.notificar(this.jogo.obterDados());

        res.json({ ok: true });
    }

    definirTimes(req, res) {

    const { timeA, timeB } = req.body;

    this.jogo.definirTimes(timeA, timeB);

    this.notificador.notificar(this.jogo.obterDados());

    res.json({ ok: true });

}

}

module.exports = JogoController;