const fs = require("fs")
const path = require("path")

const pasta = path.join(__dirname, "../../data")
const caminho = path.join(pasta, "jogos.json")

class Historico {


garantirArquivo(){

    if(!fs.existsSync(pasta)){
        fs.mkdirSync(pasta)
    }

    if(!fs.existsSync(caminho)){
        fs.writeFileSync(caminho, "[]")
    }

}

lerDados(){

    try{

        this.garantirArquivo()

        const conteudo = fs.readFileSync(caminho, "utf8")

        if(!conteudo){
            return []
        }

        return JSON.parse(conteudo)

    }catch(e){

        console.error("Erro ao ler histórico:", e)

        return []

    }

}

salvarDados(dados){

    try{

        fs.writeFileSync(
            caminho,
            JSON.stringify(dados, null, 2)
        )

    }catch(e){

        console.error("Erro ao salvar histórico:", e)

    }

}

salvarJogo(jogo){

    const dados = this.lerDados()

    dados.push(jogo)

    this.salvarDados(dados)

}

removerJogo(index){

    const dados = this.lerDados()

    dados.splice(index,1)

    this.salvarDados(dados)

}

listarJogos(){

    return this.lerDados()

}


}

module.exports = Historico