const express = require("express");

module.exports = (app, jogoController) => {

    const router = express.Router();

    router.post("/golA", (req, res) => jogoController.golA(req, res));

    router.post("/golB", (req, res) => jogoController.golB(req, res));

    router.post("/cartao", (req,res) => jogoController.cartao(req,res));

    router.post("/definir-times", (req, res) => jogoController.definirTimes(req, res));

    router.post("/remover-jogo", (req,res) => jogoController.removerJogo(req,res));

    router.get("/historico",(req,res)=> {res.json(jogoController.historico.listarJogos())})

router.post("/historico/remover",(req,res)=>{

    const { index } = req.body

    jogoController.historico.removerJogo(index)

    // avisa todos clientes que o histórico mudou
    jogoController.notificador.notificar({
        tipo: "historico-atualizado",
        historico: jogoController.historico.listarJogos()
    })

    res.json({ok:true})

})
    return router;

};