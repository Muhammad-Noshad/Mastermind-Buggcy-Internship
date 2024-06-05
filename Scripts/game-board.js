import { showMessage } from "./message.js";
import { generateCode } from "./code-generator.js";
import { setSelectedColor, getSelectedColor, getCurrentRow, userGuess, emptyUserGuess, validation, decrementCurrentRow, retrieveScore, retrieveTime, retrieveAllowDuplicates, startTimer } from "./general.js";
import { validateGuess } from "./validate-guess.js";
import { addToClassList, removeFromClassList, replaceInClassList } from "./utils/manipulate-class-list.js";

// Color pallette from which the user can pick from
const colorChoiceRows = document.querySelectorAll('.color-choices-js .row');

// Represents Big circles in the game board which are currently active (clickable)
let guessSectionRow = document.querySelectorAll('.guess-section');

// Button at the end of the game board
const checkButton = document.querySelector('.controls button');

// Represents small circles in the active row
const validationSection = document.querySelectorAll('.validation-section');

// Initializes the game-board.js
initializeGameBoard();

function initializeGameBoard(){
  retrieveScore();  // Retrieving player's previous score if any
  retrieveTime(); // Retrieving player's previous time if any
  retrieveAllowDuplicates();  // Retrieving difficulty setting
  generateCode(); // Generating code
  updateRow();  // Initializes the row
  startTimer(); // Starts timer
}

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

// Keeping track to which row the game has reached
function updateRow(){
  for(const child of guessSectionRow[getCurrentRow()].children){
    // Track if any circle of the current active row is clicked
    child.addEventListener('click', () => {
      if(getSelectedColor()){   // If a color has been selected prrior to clicking
        if(child.classList.length === 1){ // If no color is already being displayed, display this one
          addToClassList(child, getSelectedColor());
        }
        else{ // If a color is already being displayed, then replace that color with currently selected one
          replaceInClassList(child, child.classList[child.classList.length-1], getSelectedColor());
        }
        
        showMessage(`${getSelectedColor()} placed!`);
        setSelectedColor('');   // Make selected color empty
      }
      else{ // If no color has been selected prior to clicking
        if(child.classList.length > 1){ // If there is a color being displayed, remove it
          showMessage(`${child.classList[child.classList.length-1]} removed!`);
          removeFromClassList(child, child.classList[child.classList.length-1]);
        }
        else{ // Otherwise, show an error message
          showMessage('Please select a color first!', 'red');
        }
      }
    });
  }  
}

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
    removeCurrentRowEventList();
    decrementCurrentRow();
    updateRow();
  }
});

// Removing current row's event listener before moving to the next one
function removeCurrentRowEventList(){
  guessSectionRow[getCurrentRow()].replaceWith(guessSectionRow[getCurrentRow()].cloneNode(true));
}

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