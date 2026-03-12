function calcularClassificacao(jogos){

    const tabela = {}

    jogos.forEach(jogo => {

        const { timeA, timeB, golsA, golsB } = jogo

        if(!tabela[timeA]){
            tabela[timeA] = { time: timeA, p:0, j:0, v:0, e:0, d:0, gp:0, gc:0 }
        }

        if(!tabela[timeB]){
            tabela[timeB] = { time: timeB, p:0, j:0, v:0, e:0, d:0, gp:0, gc:0 }
        }

        const A = tabela[timeA]
        const B = tabela[timeB]

        A.j++
        B.j++

        A.gp += golsA
        A.gc += golsB

        B.gp += golsB
        B.gc += golsA

        if(golsA > golsB){
            A.v++
            A.p += 3
            B.d++
        }
        else if(golsB > golsA){
            B.v++
            B.p += 3
            A.d++
        }
        else{
            A.e++
            B.e++
            A.p++
            B.p++
        }

    })

    return Object.values(tabela).sort((a,b)=>{

    // pontos
    if(b.p !== a.p){
        return b.p - a.p
    }

    // saldo de gols
    const sgA = a.gp - a.gc
    const sgB = b.gp - b.gc

    if(sgB !== sgA){
        return sgB - sgA
    }

    // gols marcados
    return b.gp - a.gp
})
}

module.exports = calcularClassificacao