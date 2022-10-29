const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const spanPunctuation = document.querySelector('.punctuation');

const urlImage = "../images/";
const characters = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer'
];

const timer = document.querySelector('.timer');
let seconds = 0;
let minutes = 0;
let hours = 0;

const startTimer = () => {
    //Loop de repetição que vai executar esse metodo repetidamente com um intervalo de 1 segundo
    setInterval(
        () => {

            //Realizamod uma logica de soma onde que quando temos mais de 60 segundos zeramos a variavel  seconds
            hours = minutes >= 60 ? hours + 1 : hours;
            minutes = minutes >= 60 ? 0 : minutes;
            minutes = seconds >= 60 ? minutes + 1 : minutes;
            seconds = seconds < 60 ? seconds + 1 : 0;

            // Eu preferi fazer o meu proprio timer com variaveis internas sem precisa fazer um get nos elementos do HTML
            //const currenTime =  +Number(timer.innerHTML);
            // Ou
            //const currenTime =  Number(timer.innerHTML);

            timer.innerHTML = `${formaterTimer(hours)}:${formaterTimer(minutes)}:${formaterTimer(seconds)}`;
        }, 1000);
}

/* Placar de acertos */
const scoreboard = () => {

    const disabledCards = document.querySelectorAll('.disable-card');

    //Coloca a pontuação de cartas acertadas viradas
    localStorage.setItem('punctuation', disabledCards.length / 2);

    spanPunctuation.innerHTML = "Pontuação: " + localStorage.getItem('punctuation');

    return localStorage.getItem('punctuation');

}

let firstCard = '';
let secondsCard = '';

const clearCard = () => {
    firstCard = '';
    secondsCard = '';
}

const checkEndGame = () => {

    scoreboard();

    if (scoreboard() == characters.length) {
        alert(`Parabéns, você ganhou! Tempo de jogo de ${timer.innerHTML}`);
        window.location = '../index.html';
    }
}

const checkCards = () => {

    /*estamosa pegando o nome do personagem das duas cartas*/
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondsCharacter = secondsCard.getAttribute('data-character');

    /*Filtro de condição verificando se são os mesmos personagens */
    if (firstCharacter == secondsCharacter) {
        console.log("Acertou!");

        /*Acertaando adicionamos a classe de estilo de carta desabilidata para os 2 elementos cards na pagina */
        firstCard.firstChild.classList.add("disable-card");
        secondsCard.firstChild.classList.add("disable-card");
        clearCard(); /*Função de limpeza das variaveis */
        setTimeout(() => {
            checkEndGame();
        }, 500);
    } else {

        /* Aguarda o periodo de 500 ms e depois remove a classe de estilo reveal-card e limpa as variaveis*/
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondsCard.classList.remove('reveal-card');

            clearCard();/*Função de limpeza das variaveis */
        }, 500);
    }

}

const revealCard = ({ target }) => {

    //Se a carta já estiver revelada encerra o metodo
    if (target.parentNode.className.includes('reveal-card')) { return; }

    if (firstCard === '') {
        /* Adicionando a classe de estilo "reveal-card" para virar a carta */
        target.parentNode.classList.add('reveal-card');

        firstCard = target.parentNode;
    }
    else if (secondsCard === '') {
        /* Adicionando a classe de estilo "reveal-card" para virar a carta */
        target.parentNode.classList.add('reveal-card');

        secondsCard = target.parentNode;

        checkCards();
    }
}

const createElement = (tag, className) => {

    /*Essa função vai ser responsavel de criar um elemento e já inserir ele dentro de uma classe*/
    const element = document.createElement(tag);
    element.className = className;

    return element;
}

/* Função responsavel por cria as cartas no grid */
const CreateCard = (character) => {

    /*
    *   O Objetivo e criar uma estrutura em HTML que crie as cartas nesse formato    
    *     <div class="card">
    *             <div class="face front"></div>
    *             <div class="face back"></div>
    *     </div>
    */

    /* Criação do elemento DIV com a classe CARD */
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('${urlImage}${character}.png')`;



    /* Colocamos a classe FRONT e BACK como filhos da classe CARD */
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}


/* Função responsavel pela criação do game, carregamos as fotos 1 a 1 
e criamos uma lista  com todos os itens nela*/
const loadGame = () => {

    /* Criamos uma nova lista com todos os personagem sendo adicionado 2 vezes para fazer os pares*/
    const duplicateCharacters = [...characters, ...characters];


    checkEndGame();

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {

        const card = CreateCard(character);

        grid.appendChild(card);

    });
}

//Mantem o timer com 2 digitos sempre
const formaterTimer = (n) => {
    switch (n) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            return "0" + n;
        default:
            return n;

    }
}

/* Função que e executada automaticamente junto com o carregamento da pagina */
window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}