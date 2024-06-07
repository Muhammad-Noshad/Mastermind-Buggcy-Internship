import { code, userGuess, validation } from "./general.js";

// Validates player's guess
export function validateGuess(){
  for(let x = 0; x < userGuess.length; x++){
    // If user's guessed color is present in code
    if(code.includes(userGuess[x])){
      if(code[x] === userGuess[x]){
        // If user's guessed color is in the same index as in code array
        validation.push("red");
      }
      else{
        // If user's guessed color is in the code array but not at the same index
        validation.push("white");
      }
    }
    else{
      // If user's guessed color is not present in code array
      validation.push("");
    }
  }

  randomizeOrder();
}

// Randomizes the order of validation array
function randomizeOrder(){
  validation.sort((a, b) => { return 0.5 - Math.random(); })
}