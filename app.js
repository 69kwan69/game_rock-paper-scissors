function getComputerChoice() {
    let pcChoice = Math.floor(Math.random() * 3) + 1;

    if (pcChoice === 1) {
        pcChoice = 'rock';
    } else if (pcChoice === 2) {
        pcChoice = 'paper';
    } else {
        pcChoice = 'scissors';
    }
    console.log(pcChoice);  //oh no cheating!
    return pcChoice;
}

function getPlayerChoice() {
    let gameContinue = true;
    while (gameContinue) {
        let playerChoice = prompt('Rock, Paper or Scissors?');
        if (!(playerChoice.toLowerCase() === 'rock' ||
            playerChoice.toLowerCase() === 'paper' ||
            playerChoice.toLowerCase() === 'scissors')) {
            console.log(`${playerChoice} is not an option in this game`)
            continue;
        } else {
            return playerChoice.toLowerCase();
        }
    }
}

function game(pcChoice, playerChoice) {
    let tempWinner;

    if (playerChoice === pcChoice) {
        tempWinner = 'draw';
    } else if (playerChoice === 'rock') {
        tempWinner = (pcChoice === 'paper') ? 'PC' : 'Player';
    } else if (playerChoice === 'paper') {
        tempWinner = (pcChoice === 'scissors') ? 'PC' : 'Player';
    } else if (playerChoice === 'scissors') {
        tempWinner = (pcChoice === 'rock') ? 'PC' : 'Player';
    }

    return tempWinner;
}

let playerScore = 0;
let pcScore = 0;
for (let i = 0; i < 5; i++) {
    let round = game(getComputerChoice(), getPlayerChoice())
    if (round === 'draw') {
        alert('DRAW!');
    } else if (round === 'PC') {
        pcScore++;
        alert(`${round} win!`);
    } else {
        playerScore++;
        alert(`${round} win!`);
    }
}

let winner = '';
if (playerScore < pcScore) {
    winner = 'PC';
} else if (playerScore > pcScore) {
    winner = 'Player';
} else {
    winner = 'None!'
}
alert(`The winner is: ${winner} \nPlayer's Score: ${playerScore}. \nPC's Score: ${pcScore}`)