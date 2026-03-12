class Jogo {

    constructor() {
        this.jogo = {
            id: null,
            timeA: "",
            timeB: "",
            golsA: 0,
            golsB: 0,
            minuto: 0,
            data: "",
            eventos: []
        };
    }

    definirTimes(timeA, timeB) {

        this.jogo.id = Date.now();
        this.jogo.data = new Date().toLocaleString();

        this.jogo.timeA = timeA;
        this.jogo.timeB = timeB;

        this.jogo.golsA = 0;
        this.jogo.golsB = 0;
        this.jogo.minuto = 0;
        this.jogo.eventos = [];
    }

    golTimeA(jogador) {

        this.jogo.golsA++;

        const evento =
            `${this.jogo.minuto}' ⚽ Gol de ${jogador} (${this.jogo.timeA})`;

        this.jogo.eventos.push(evento);
    }

    golTimeB(jogador) {

        this.jogo.golsB++;

        const evento =
            `${this.jogo.minuto}' ⚽ Gol de ${jogador} (${this.jogo.timeB})`;

        this.jogo.eventos.push(evento);
    }

    cartaoAmarelo(jogador, time) {
        const nomeTime = time === "A" ? this.jogo.timeA : this.jogo.timeB

        const evento =
            `${this.jogo.minuto}' 🟨 Cartão amarelo para ${jogador} (${nomeTime})`;
        this.jogo.eventos.push(evento);
    }

    cartaoVermelho(jogador, time) {
        const nomeTime = time === "A" ? this.jogo.timeA : this.jogo.timeB

        const evento =
            `${this.jogo.minuto}' 🟥 Cartão vermelho para ${jogador} (${nomeTime})`;
        this.jogo.eventos.push(evento);
    }

    atualizarMinuto(minuto){
        this.jogo.minuto = minuto;
    }

    obterDados(){
        return JSON.parse(JSON.stringify(this.jogo));
    }

    removerJogo() {
        this.jogo = {
            id: null,
            timeA: "",
            timeB: "",
            golsA: 0,
            golsB: 0,
            minuto: 0,
            data: "",
            eventos: []
        };
    }
}

module.exports = Jogo;