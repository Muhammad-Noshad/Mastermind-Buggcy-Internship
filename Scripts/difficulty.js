import { addToClassList, removeFromClassList } from "./utils/manipulate-class-list.js";

const difficultyButtons = document.querySelectorAll('.difficulty .container .wrapper button');

// Initializes difficulty buttons
initializeButtons();

function initializeButtons(){
  if(JSON.parse(localStorage.getItem('allowDuplicates'))){  // If allowDuplicates is true, highlight the hard button
    addToClassList(difficultyButtons[1], 'btn-active');    
  }
  else{ // If allowDuplicate is false or null, highlight the easy button
    addToClassList(difficultyButtons[0], 'btn-active');
  }
}

// Eventlistener for easy button
difficultyButtons[0].addEventListener('click', () => {  // If easy button is clicked,
  if(!difficultyButtons[0].classList.contains('btn-active')){ // If easy button is not highlighted,
    addToClassList(difficultyButtons[0], 'btn-active');   // Highlight the easy button
    removeFromClassList(difficultyButtons[1], 'btn-active');  // Remove highlight from the hard button
    localStorage.setItem('allowDuplicates', false);   // Don't allow duplicates
  }
});

// Eventlistener for hard button
difficultyButtons[1].addEventListener('click', () => {  // If hard button is clicked,
  if(!difficultyButtons[1].classList.contains('btn-active')){   // If hard button is not highlighted,
    addToClassList(difficultyButtons[1], 'btn-active');   // Highlight the hard button
    removeFromClassList(difficultyButtons[0], 'btn-active');  // Remove highlight from the easy button
    localStorage.setItem('allowDuplicates', true);  // Allow duplicates
  }
});