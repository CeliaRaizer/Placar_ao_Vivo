class Jogo {

    constructor() {
        this.jogo = {
            timeA: "",
            timeB: "",
            golsA: 0,
            golsB: 0,
            eventos: []
        };
    }

    definirTimes(timeA, timeB) {

        this.jogo.timeA = timeA;
        this.jogo.timeB = timeB;

        this.jogo.golsA = 0;
        this.jogo.golsB = 0;
        this.jogo.eventos = [];

    }

    golTimeA() {
        this.jogo.golsA++;
        this.jogo.eventos.push(`⚽ Gol do ${this.jogo.timeA}`);
    }

    golTimeB() {
        this.jogo.golsB++;
        this.jogo.eventos.push(`⚽ Gol do ${this.jogo.timeB}`);
    }

    obterDados() {
        return this.jogo;
    }

}

module.exports = Jogo;