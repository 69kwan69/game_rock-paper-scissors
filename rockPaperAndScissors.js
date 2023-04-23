const playerCards = document.querySelectorAll('.player.card');
const narrator = document.querySelector('.narrator');
const opponentCard = document.querySelector('.opponent.card');
const playground = document.querySelector('.playground');
const restartBtn = document.querySelector('.btn.restart');

let playerCard;
const initialClasses = {
    opponent: opponentCard.className,
    player: [
        playerCards[0].className,
        playerCards[1].className,
        playerCards[2].className,
    ]
}

// Settings
let firstRound = true;
let dialogInterval = 2000;


// Logic goes here
function restartGame() {
    // Reset the whole thing using some initial variables
    firstRound = false;
    dialogInterval = 1000;

    // Other cards and player's card
    playerCards.forEach((card, index) => {
        card.className = initialClasses.player[index];
    })

    // Player's card
    playerCard.style.cssText = null;

    // Opponent's card
    opponentCard.className = initialClasses.opponent;
    opponentCard.querySelector('.description').classList.remove('hidden');
    opponentCard.style.cssText = null;

    // Narrator
    updateNarrator('Choose a power:')

    this.classList.add('hidden');
}

function startGame() {
    playerCard = this;

    // Hide the other cards
    playerCards.forEach(card => {
        if (card !== playerCard) {
            card.classList.add('transparent');
            card.classList.add('unclickable');
        }
    })

    // Get player's card ready
    playerCard.classList.add('unclickable');

    playerCard.style.cssText = `
    translate: ${(playerCard === playerCards[0]) ? '105%' : (playerCard === playerCards[1]) ? '-20%' : '-145%'};
    scale: 1;
    transition: .25s;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    `;

    // Get opponent's card ready
    opponentCard.classList.add('unclickable');
    opponentCard.querySelector('.description').classList.add('hidden');

    opponentCard.style.cssText = `
    translate: -100%;
    transition: .25s;
    `;


    // Narrator's line
    if (firstRound) {
        const lines = narratorLines[this.dataset.element].lines;

        setTimeout(() => updateNarrator(lines.shift()), 40);

        const dialog = setInterval(() => {
            updateNarrator(lines.shift());
            if (lines.length === 0) {
                displayResult();
                clearInterval(dialog);
            }
        }, dialogInterval);
    } else {
        dialogInterval = 1000;
        displayResult();
        setTimeout(() => updateNarrator("Aight let's do this quick"), 40);
    }
}

function displayResult() {
    setTimeout(() => {
        const playerChoice = playerCard.dataset.element;
        const result = calculateResult(playerChoice, revealOpponentCard());

        let line;
        if (result === 'draw') {
            line = "Great minds think alike. Let's be friends.";
            playerCard.classList.add('draw');
        } else if (result === 'win') {
            line = narratorLines[playerChoice].cases.win;
            playerCard.classList.add('win');
            opponentCard.classList.add('lose');
        } else {
            line = narratorLines[playerChoice].cases.lose;
            playerCard.classList.add('lose');
            opponentCard.classList.add('win');
        }
        updateNarrator(line);

        restartBtn.classList.remove('hidden');
    }, dialogInterval);

}

function calculateResult(playerChoice, pcChoice) {
    let result;

    if (playerChoice === pcChoice) {
        result = 'draw';
    } else if (playerChoice === 'rock') {
        result = (pcChoice === 'paper') ? 'lose' : 'win';
    } else if (playerChoice === 'paper') {
        result = (pcChoice === 'scissors') ? 'lose' : 'win';
    } else if (playerChoice === 'scissors') {
        result = (pcChoice === 'rock') ? 'lose' : 'win';
    }

    return result;
}

function getOpponentChoice() {
    let pcChoice = Math.floor(Math.random() * 3) + 1;

    if (pcChoice === 1) {
        pcChoice = 'rock';
    } else if (pcChoice === 2) {
        pcChoice = 'paper';
    } else {
        pcChoice = 'scissors';
    }

    return pcChoice;
}

function updateOpponentCard() {
    const backface = opponentCard.querySelector('.backface');

    backface.dataset.element = getOpponentChoice();
    const choice = backface.dataset.element;

    switch (choice) {
        case 'rock':
            backface.innerHTML = '<img src="images/stone-axe_vector-transparent.png" alt="Rock">';
            break;
        case 'paper':
            backface.innerHTML = '<img src="images/books_vector-transparent.png" alt="Paper">';
            break;
        case 'scissors':
            backface.innerHTML = '<img src="images/garden-scissors_vector-transparent.png" alt="Scissors">';
            break;
    }

    return choice;
}

function revealOpponentCard() {
    const choice = updateOpponentCard();
    opponentCard.classList.add('flip-animation');
    return choice;
}

function updateNarrator(message) {
    narrator.classList.remove('typing-animation');
    void narrator.offsetWidth;
    narrator.classList.add('typing-animation');

    if (typeof (message) === 'string') {
        narrator.textContent = message;
    } else {
        narrator.textContent = this.dataset.description;
    }
}

playerCards.forEach(card => {
    card.addEventListener('click', startGame)
    card.addEventListener('mouseenter', updateNarrator);
    card.addEventListener('mouseleave', () => updateNarrator('Choose a power:'));
})

opponentCard.addEventListener('mouseenter', updateNarrator);
opponentCard.addEventListener('mouseleave', () => updateNarrator('Choose a power:'));

restartBtn.addEventListener('click', restartGame);