class JogoController {

    constructor(jogo, notificador, historico) {
        this.jogo = jogo;
        this.notificador = notificador;
        this.historico = historico;
    }

    golA(req, res) {

        const { jogador, minuto } = req.body;

        this.jogo.atualizarMinuto(minuto);
        this.jogo.golTimeA(jogador);

        this.notificador.notificar(this.jogo.obterDados());

        res.json({ ok: true });
    }

    golB(req, res) {

        const { jogador, minuto } = req.body;

        this.jogo.atualizarMinuto(minuto);
        this.jogo.golTimeB(jogador);

        this.notificador.notificar(this.jogo.obterDados());

        res.json({ ok: true });
    }

    cartao(req,res){
        const { jogador, minuto, tipo, time } = req.body
        this.jogo.atualizarMinuto(minuto)

        if(tipo === "amarelo"){
            this.jogo.cartaoAmarelo(jogador, time)
        }else{
            this.jogo.cartaoVermelho(jogador, time)
        }

        this.notificador.notificar(this.jogo.obterDados())
        res.json({ok:true}) 
    }

    definirTimes(req, res) {

        const { timeA, timeB } = req.body;

        this.jogo.definirTimes(timeA, timeB);

        this.notificador.notificar(this.jogo.obterDados());

        res.json({ ok: true });

    }

    removerJogo(req,res){

        // salva jogo no histórico
        this.historico.salvarJogo(this.jogo.obterDados())

        // remove jogo atual
        this.jogo.removerJogo()

        // atualiza placar para quem acompanha ao vivo
        this.notificador.notificar(this.jogo.obterDados())

        // envia histórico atualizado
        this.notificador.notificar({
            tipo: "historico-atualizado",
            historico: this.historico.listarJogos()
        })

        res.json({ok:true})
    }
}

module.exports = JogoController;