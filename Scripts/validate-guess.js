import { checkGameOver } from "./game-over.js";
import { code, userGuess, validation, emptyValidation, emptyUserGuess } from "./general.js";

// Validates user's guess
export function validateGuess(){
  console.log(userGuess);
  if(validation.length > 0){
    emptyValidation();
    console.log('Emptied!', validation);
  }

  for(let x = 0; x < userGuess.length; x++){
    if(code.includes(userGuess[x])){
      if(code[x] === userGuess[x]){
        validation.push("red");
      }
      else{
        validation.push("white");
      }
    }
    else{
      validation.push("");
    }
  }

  console.log(validation);
  randomizeOrder();
  console.log("After randomization :", validation);
  checkGameOver();
  emptyUserGuess();
  console.log("After emptying", userGuess);
}

function randomizeOrder(){
  validation.sort((a, b) => { return 0.5 - Math.random(); })
}