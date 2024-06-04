import { colors, code, startTimer } from "./general.js";
import { generateRandomNum } from "./utils/random.js"

// Generates code
function generateCode(){
  let temp;

  for(let x = 0; x < code.length; x++){
    temp = generateRandomNum();
    if(!code.includes(colors[temp])){
      code[x] = colors[temp];
    }
    else{
      x--;
    }
  }
}

const computerRow = document.querySelector('.computer-row-js');

// Shows code in the first row of the game board
function showCode() {
  for(let x = 0; x < computerRow.childElementCount; x++){
    computerRow.children[x].style.backgroundColor = code[x];
  }
}

// Handles initializing and showing code
export function initializeCode(){
  generateCode();
  // showCode();
  startTimer();
  console.log(code);
}