import { setIsGameOver, getIsGameOver, setIsPlayerWon, getCurrentRow, userGuess, code, getIsPlayerWon, calculateScore, getScore } from "./general.js";

// A function to check if the game is over or not
export function checkGameOver(){
  let isEqual = true;   // Assume that the userGuess and code are the same

  // Match user guess
  for (let x = 0; x < code.length; x++) {
    if(!(userGuess[x] === code[x])){
      // If even one of the items of userGuess does not match the code item
      isEqual = false;  
      break;
    } 
  }

  // If user has guessed correctly
  if(isEqual){
    setIsPlayerWon(true);
  }

  // If player has won or all the rows have been filled
  if(getIsPlayerWon() || !getCurrentRow()){
    setIsGameOver(true);
    calculateScore();
    displayEndScreen();
  }
}

// Displays end screen
const endScreen = document.querySelector('.end-screen');

// Displays game board
const gameBoard = document.querySelector('.game-board');

// Function to handle the end screen
function displayEndScreen(){
  if(getIsGameOver()){  // If game is over
    if(getIsPlayerWon()){ // If player has won
      endScreen.children[0].textContent = '🥳';
      endScreen.children[1].textContent = 'You Won!';
      endScreen.children[2].textContent = "Congratulations! You've done it!";
      endScreen.children[3].textContent = `the code was ${code.toString()}`;
      endScreen.children[4].textContent = `Your Score is ${getScore()}`;
    }
    else{ // If player has lost
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

// Show/Hide game board
function toggleGameBoard(){
  gameBoard.classList.toggle('hide');
}

// Show/Hide end screen
function toggleEndScreen(){
  endScreen.classList.toggle('hide');
}

// Listens for click event for the Play Again button on the end screen
endScreen.children[5].addEventListener('click', () => {
  location.reload();  // Refreshes the page
});