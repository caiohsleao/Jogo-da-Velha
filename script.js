let celulas = document.querySelectorAll(".celula"); //"captura" todos os elementos da classe "célula"
let checarTurno = true; //checa qual é o jogador da vez 

let jogadorX = "X"; //define o caracter que vai ser inserido quando o Jogador X clicar em uma célula
let jogadorO = "O"; //define o caracter que vai ser inserido quando o Jogador O clicar em uma célula

let combinacoes = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // combinações de vitorias nas linhas 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //combinações de vitorias por colunas 
    [0, 4, 8], [2, 4, 6] // combinações de vitórias na diagonal
];

document.addEventListener("click", (event) => { //criação do evento ao acontecer o clique
    if (event.target.matches(".celula")) { // se houver uma identificação do evento com algum elemento da classe "celula", é chamada a função Jogar
        jogar(event.target.id); 
    }
})

function jogar (id) {
    let celulaClicada = document.getElementById(id);
    turno = checarTurno ? jogadorX : jogadorO;// o operador ternário define que se for TRUE, é a vez do jogador X (ele inicia o jogo)
    celulaClicada.textContent = turno; //após a atribuição de X ou 0 para turno, a célula clicada exibe o símbolo respectivo ao jogador
    celulaClicada.classList.add(turno) //adiciona uma classe dentro da célula clicada com o nome do caractere do jogador que clicou 
    checarVencedor(turno) // checa se o jogador da vez é o vencedor 

}

function checarVencedor(turno) { //se a função retornar TRUE, há um vencedor. Se retornar FALSE, o jogo continua.  
    let vencedor = combinacoes.some((comb) => { //percorre o array de combinações e se uma das 8 combinações retornar TRUE, toda a função retorna TRUE
        return comb.every((index) => { // todas as combinações precisam retornar TRUE para a função retornar TRUE
            return celulas[index].classList.contains(turno); // se as 3 posições do array tiverem o mesmo símbolo (X ou O), é retornado TRUE, e logo o every também retorna TRUE 
        })
    })

    if (vencedor) { //se tiver um vencedor, o jogo é encerrado
        encerrarJogo(turno); //identifica que o "turno" é o vencedor
    } else if(checarEmpate()) { //checa se as 9 casas estão preenchidas e , se sim, encerra o jogo como EMPATE
        encerrarJogo(); // não identifica ninguém como vencedor (não há parÂmetro)
    } else {
        checarTurno = !checarTurno; // alterna o jogador e o jogo continua 
    }

}

function checarEmpate() {
    let x = 0; 
    let o = 0;

    for (index in celulas) {
        if (!isNaN(index)) { //verifica se o elemento no index é um número 
            if (celulas[index].classList.contains(jogadorX)) {
                x++; // 
            }
    
            if (celulas[index].classList.contains(jogadorO)) {
                o++;
            }
        }     
    }
    return x + o === 9 ? true : false; // se todas as células estiverem preenchidas, retorna TRUE (Empate). Se for menos, retorna FALSE e o jogo continua 
}

function encerrarJogo(vencedor = null) { //se a função for chamada com parâmetro, prevalece o valor deste. Se for chamada sem, será nula
    let telaEscura = document.getElementById("tela-escura"); 
    let h2 = document.createElement("h2"); //cria o elemento h2
    let h3 = document.createElement("h3"); //cria o elemento h3
    

    telaEscura.style.display = "block"; //exibe uma tela preta quando o jogo é encerrado
    telaEscura.appendChild(h2);//insere o h2 na tela escura
    telaEscura.appendChild(h3); // insere o h3 na tela escura 


    if (vencedor) { 
        h2.innerHTML = 'O jogador ' + vencedor +  ' venceu'; //insere esse texto no h2
    } else {
        h2.innerHTML = "Empatou"; //insere esse texto no h2
    }

    let contador = 3; //determina que o jogo se reiniciará em 3 segundos
    setInterval(() => {
        h3.innerHTML = "Reiniciando em " + contador--;
    }, 1000); // a cada  1 segundo, essa função é atualizada 

    setTimeout(() => location.reload(), 4000); // a página é atualizada após 4 segundos 
}