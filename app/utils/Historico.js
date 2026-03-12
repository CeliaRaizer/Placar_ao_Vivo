const fs = require("fs");
const caminho = "./data/jogos.json";

class Historico {

    salvarJogo(jogo){
        let dados = [];

        if(fs.existsSync(caminho)){
            const conteudo = fs.readFileSync(caminho, "utf8");

            if(conteudo){
                dados = JSON.parse(conteudo);
            }
        }
        dados.push(jogo);
        fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
    }

    removerJogo(index){
        const dados = JSON.parse(fs.readFileSync(caminho, "utf8"));
        dados.splice(index,1);
        fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
    }

    listarJogos(){

        if(!fs.existsSync(caminho)){
            return [];
        }

        const conteudo = fs.readFileSync(caminho, "utf8");
        
        if(!conteudo){
            return [];
        }

        return JSON.parse(conteudo);
    }

}

module.exports = Historico;