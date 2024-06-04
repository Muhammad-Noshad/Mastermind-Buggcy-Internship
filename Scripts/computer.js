import { colors, code, startTimer } from "./general.js";
import { generateRandomNum } from "./utils/random.js"

// Generates code
function generateCode(){
  let temp;

  for(let x = 0; x < code.length; x++){
    temp = generateRandomNum();
    
    if(!code.includes(colors[temp])){ 
      code[x] = colors[temp];   // If color is not already present in the code
    }
    else{
      x--;    // If color is already present, decrement x to indicate no color was inserted
    }
  }
}

// Handles initializing code and starting the timer
export function initializeCode(){
  generateCode();
  startTimer();
}