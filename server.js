const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// imports
const Jogo = require("./app/models/Jogo");
const Notificador = require("./app/utils/Notificador");
const Historico = require("./app/utils/Historico");
const JogoController = require("./app/controllers/JogoController");
const configurarRotas = require("./app/routes/routes");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// iniciar sistema
const jogo = new Jogo();
const notificador = new Notificador(wss);
const historico = new Historico();

const jogoController = new JogoController(jogo, notificador, historico);

// websocket
wss.on("connection", ws => {

    console.log("Cliente conectado")

    enviarUsuarios()

    // enviar estado atual do jogo
    ws.send(JSON.stringify(jogo.obterDados()))

    // enviar histórico
    ws.send(JSON.stringify({
        tipo: "historico-atualizado",
        historico: historico.listarJogos()
    }))

    ws.on("close", () => {
        console.log("Cliente desconectado")
        enviarUsuarios()
    })

})

function enviarUsuarios(){

    const total = wss.clients.size

    const dados = JSON.stringify({
        tipo: "usuarios",
        total: total
    })

    wss.clients.forEach(cliente => {
        if(cliente.readyState === WebSocket.OPEN){
            cliente.send(dados)
        }
    })

}

// rotas
const rotas = configurarRotas(app, jogoController);

app.use(rotas);

// iniciar servidor
server.listen(PORT, () => {

    console.log("Servidor rodando na porta", PORT);

});