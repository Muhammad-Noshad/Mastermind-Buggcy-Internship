import { setIsGameOver, getIsGameOver, setIsPlayerWon, getCurrentRow, userGuess, code, getIsPlayerWon, calculateScore, getScore } from "./general.js";

export function checkGameOver(){
  let isEqual = true;
  console.log(userGuess, code);
  for (let x = 0; x < code.length; x++) {
    if(!(userGuess[x] === code[x]))
      isEqual = false;
  }

  if(isEqual){
    setIsPlayerWon(true);
    console.log('Player Won');
  }

  if(getIsPlayerWon() || !getCurrentRow()){
    setIsGameOver(true);
    calculateScore();
    console.log('Game over');
    displayEndScreen();
  }
}

const endScreen = document.querySelector('.end-screen');
const gameBoard = document.querySelector('.game-board');

function displayEndScreen(){
  if(getIsGameOver()){
    if(getIsPlayerWon()){
      endScreen.children[0].textContent = '🥳';
      endScreen.children[1].textContent = 'You Won!';
      endScreen.children[2].textContent = "Congratulations! You've done it!";
      endScreen.children[3].textContent = `the code was ${code.toString()}`;
      endScreen.children[4].textContent = `Your Score is ${getScore()}`;
    }
    else{
      endScreen.children[0].textContent = '🙁';
      endScreen.children[1].textContent = 'You Lost!';
      endScreen.children[2].textContent = "Better luck next time!";
      endScreen.children[3].textContent = `the code was ${code.toString()}`;
      endScreen.children[4].textContent = `Your Score is ${getScore()}`;
    }
  }
  toggleGameBoard();
  toggleEndScreen();
}

function toggleGameBoard(){
  console.log(gameBoard);
  gameBoard.classList.toggle('hide');
}

function toggleEndScreen(){
  endScreen.classList.toggle('hide');
}

endScreen.children[5].addEventListener('click', () => {
  location.reload();
})