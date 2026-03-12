const calcularClassificacao = require("../utils/classificacao")

class JogoController {

    constructor(jogo, notificador, historico) {
        this.jogo = jogo
        this.notificador = notificador
        this.historico = historico
    }

    // --------------------- Gol Time A ---------------------
    golA(req, res) {
        try {
            const { jogador, minuto } = req.body

            if(!jogador || !minuto) return res.status(400).json({erro:"Informe jogador e minuto"})

            this.jogo.atualizarMinuto(minuto)
            this.jogo.golTimeA(jogador)

            // notificar placar atualizado
            this.notificador.notificar({
                tipo: "jogo-atualizado",
                jogo: this.jogo.obterDados()
            })

            // atualizar classificação em tempo real
            this.atualizarClassificacao()

            res.json({ ok: true })

        } catch(e) {
            console.error("Erro golA:", e)
            res.status(500).json({ erro: "Erro ao registrar gol" })
        }
    }

    // --------------------- Gol Time B ---------------------
    golB(req, res) {
        try {
            const { jogador, minuto } = req.body

            if(!jogador || !minuto) return res.status(400).json({erro:"Informe jogador e minuto"})

            this.jogo.atualizarMinuto(minuto)
            this.jogo.golTimeB(jogador)

            this.notificador.notificar({
                tipo: "jogo-atualizado",
                jogo: this.jogo.obterDados()
            })

            this.atualizarClassificacao()

            res.json({ ok: true })

        } catch(e) {
            console.error("Erro golB:", e)
            res.status(500).json({ erro: "Erro ao registrar gol" })
        }
    }

    // --------------------- Cartão ---------------------
    cartao(req,res){
        try {
            const { jogador, minuto, tipo, time } = req.body
            if(!jogador || !minuto || !tipo || !time) return res.status(400).json({erro:"Dados incompletos"})

            this.jogo.atualizarMinuto(minuto)

            if(tipo === "amarelo"){
                this.jogo.cartaoAmarelo(jogador, time)
            } else {
                this.jogo.cartaoVermelho(jogador, time)
            }

            this.notificador.notificar({
                tipo: "jogo-atualizado",
                jogo: this.jogo.obterDados()
            })

            res.json({ ok: true })

        } catch(e) {
            console.error("Erro cartao:", e)
            res.status(500).json({ erro: "Erro ao registrar cartão" })
        }
    }

    // --------------------- Definir Times ---------------------
    definirTimes(req, res) {
        try {
            const { timeA, timeB } = req.body
            if(!timeA || !timeB) return res.status(400).json({erro:"Informe ambos os times"})

            this.jogo.definirTimes(timeA, timeB)

            this.notificador.notificar({
                tipo: "jogo-atualizado",
                jogo: this.jogo.obterDados()
            })

            this.atualizarClassificacao()

            res.json({ ok: true })

        } catch(e) {
            console.error("Erro definirTimes:", e)
            res.status(500).json({ erro: "Erro ao definir times" })
        }
    }

    // --------------------- Remover Jogo ---------------------
    removerJogo(req,res){
        try {

            const dados = this.jogo.obterDados()
            if(!dados || !dados.timeA){
                return res.status(400).json({erro:"Nenhum jogo ativo"})
            }

            const jogoFinalizado = {...dados}

            // salva no histórico
            this.historico.salvarJogo(jogoFinalizado)

            // limpa o jogo atual
            this.jogo.removerJogo()

            // notifica que o jogo terminou
            this.notificador.notificar({
                tipo: "jogo-finalizado",
                jogo: jogoFinalizado
            })

            // envia estado atual do jogo (agora vazio)
            this.notificador.notificar({
                tipo: "jogo-atualizado",
                jogo: this.jogo.obterDados()
            })

            // envia histórico atualizado
            const jogos = this.historico.listarJogos()
            this.notificador.notificar({
                tipo: "historico-atualizado",
                historico: jogos
            })

            // atualizar classificação
            this.atualizarClassificacao()

            res.json({ ok: true })

        } catch(e){
            console.error("Erro removerJogo:", e)
            res.status(500).json({ erro: "Erro ao finalizar jogo" })
        }
    }

    removerHistorico(req,res){

        try{

            const { index } = req.body

            if(index === undefined){
                return res.status(400).json({erro:"Index não informado"})
            }

            // remove do histórico
            this.historico.removerJogo(index)

            // pega lista atualizada
            const jogos = this.historico.listarJogos()

            // envia atualização para TODOS os clientes
            this.notificador.notificar({
                tipo: "historico-atualizado",
                historico: jogos
            })

            // atualiza classificação também
            this.atualizarClassificacao()

            res.json({ ok:true })

        }catch(e){

            console.error("Erro removerHistorico:",e)

            res.status(500).json({erro:"Erro ao remover jogo"})

        }

    }

    // --------------------- Atualizar Classificação ---------------------
    atualizarClassificacao(){
        try {
            const jogos = [...this.historico.listarJogos()]

            // inclui o jogo atual se houver
            const jogoAtual = this.jogo.obterDados()
            if(jogoAtual && jogoAtual.timeA){
                jogos.push(jogoAtual)
            }

            const tabela = calcularClassificacao(jogos)

            this.notificador.notificar({
                tipo: "classificacao-atualizada",
                tabela: tabela
            })

        } catch(e){
            console.error("Erro atualizarClassificacao:", e)
        }
    }

}

module.exports = JogoController