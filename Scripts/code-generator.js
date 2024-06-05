import { colors, code, getAllowDuplicates } from "./general.js";
import { generateRandomNum } from "./utils/random.js"

// Generates code
export function generateCode(){
  if(getAllowDuplicates()){ // If duplicates are allowed
    for(let x = 0; x < code.length; x++){
      code[x] = colors[generateRandomNum()];   
    }
  }
  else{ // If duplicates are not allowed
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
}