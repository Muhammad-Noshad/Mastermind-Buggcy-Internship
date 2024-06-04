import { showMessage } from "./message.js";
import { initializeCode } from "./computer.js";
import { setSelectedColor, getSelectedColor, getCurrentRow, userGuess, emptyUserGuess, validation, decrementCurrentRow, retrieveScore, retrieveTime } from "./general.js";
import { validateGuess } from "./validate-guess.js";

// Retrieving player's previous score if any
retrieveScore();

// Retrieving player's previous time if any
retrieveTime();

// Initializing code (computer guess)
initializeCode();

const colorChoiceRows = document.querySelectorAll('.color-choices-js .row');

// Getting the color selected by the user
colorChoiceRows.forEach((row) => {
  for(const child of row.children){
    // Track which color was selected by the user from the given color choices
    child.addEventListener('click', () => {
      setSelectedColor(child.classList[1]);
      showMessage(`${getSelectedColor()} selected`, 'white');
    });
  }
});

let guessSectionRow = document.querySelectorAll('.guess-section');

//Initializing the row
updateRow();

// Keeping track to which row the game has reached
function updateRow(){
  for(const child of guessSectionRow[getCurrentRow()].children){
    // Track if any circle of the current active row is clicked
    child.addEventListener('click', () => {
      if(getSelectedColor()){   // If a color has been selected prrior to clicking
        if(child.classList.length === 1){ // If no color is already being displayed, display this one
          child.classList.add(getSelectedColor());
        }
        else{ // If a color is already being displayed, then replace that color with currently selected one
          child.classList.replace(child.classList[child.classList.length-1], getSelectedColor());
        }
        
        showMessage(`${getSelectedColor()} placed!`);
        setSelectedColor('');   // Make selected color empty
      }
      else{ // If no color has been selected prior to clicking
        if(child.classList.length > 1){ // If there is a color being displayed, remove it
          showMessage(`${child.classList[child.classList.length-1]} removed!`);
          child.classList.remove(child.classList[child.classList.length-1]);
        }
        else{ // Otherwise, show an error message
          showMessage('Please select a color first!', 'red');
        }
      }
    });
  }  
}

const checkButton = document.querySelector('.controls button');

// Checking if the check button is pressed
checkButton.addEventListener('click', () => {
  let isGuessValid = true;

  for(const child of guessSectionRow[getCurrentRow()].children){
    // If any of the circle of current active row is empty
    if(child.classList.length === 1){
      emptyUserGuess();
      isGuessValid = false;
      showMessage('Please Fill in all four dots!', 'red')
      break;
    }

    // Otherwise, push user's guessed colors into userGuess array
    userGuess.push(child.classList[child.classList.length - 1]);
  }
  
  // If the guess is valid (all circles of active row are filled)
  if(isGuessValid){
    validateGuess();
    showValidation();
    removeCurrRowEventList();
    decrementCurrentRow();
    updateRow();
  }
});

const validationSection = document.querySelectorAll('.validation-section');

// Displaying how close the user's guess was
function showValidation(){
  let counter = 0;

  // Populating the small circles next the the big circles of the current active row (validation section)
  for(const row of validationSection[getCurrentRow()].children){
    for(const circle of row.children){
      circle.style.backgroundColor = validation[counter++];
    }
  }
}

// Removing current row's event listener before moving to the next one
function removeCurrRowEventList(){
  guessSectionRow[getCurrentRow()].replaceWith(guessSectionRow[getCurrentRow()].cloneNode(true));
}