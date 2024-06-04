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
    child.addEventListener('click', () => {
      setSelectedColor(child.classList[1]);
      console.log(getSelectedColor());
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
    child.addEventListener('click', () => {
      if(getSelectedColor()){
        if(child.classList.length === 1){
          child.classList.add(getSelectedColor());
        }
        else{
          child.classList.replace(child.classList[child.classList.length-1], getSelectedColor());
        }
        
        showMessage(`${getSelectedColor()} placed!`);
        setSelectedColor('');
      }
      else{
        if(child.classList.length > 1){
          showMessage(`${child.classList[child.classList.length-1]} removed!`);
          child.classList.remove(child.classList[child.classList.length-1]);
        }
        else{
          showMessage('Please select a color first!', 'red');
        }
      }
      console.log(child.classList);
    });
  }  
}

const checkButton = document.querySelector('.controls button');

// Checking if the check button is pressed
checkButton.addEventListener('click', () => {
  let isGuessValid = true;

  for(const child of guessSectionRow[getCurrentRow()].children){
    if(child.classList.length === 1){
      emptyUserGuess();
      isGuessValid = false;
      showMessage('Please Fill in all four dots!', 'red')
      break;
    }
    userGuess.push(child.classList[child.classList.length - 1]);
  }
  
  console.log(userGuess);
  if(isGuessValid){
    validateGuess();
    showValidation();
    removeCurrRowEventList();
    decrementCurrentRow();
    updateRow();
    console.log(getCurrentRow());
  }
});

const validationSection = document.querySelectorAll('.validation-section');

console.log(validationSection);

// Displaying how close the user's guess was
function showValidation(){
  let counter = 0;

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