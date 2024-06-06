import { toggleCheckButton } from "./game-board.js";

// Range of available colors
export const colors = ['red', 'green', 'blue', 'yellow', 'brown', 'orange', 'black', 'white'];

// Computer generated code array of size 4
export const code = new Array(4);

// Color selected by user
let selectedColor = '';

// A function to set the selected color by the user
export function setSelectedColor(color){
  selectedColor = color;
}

// A function to get the selected color
export function getSelectedColor(){
  return selectedColor;
}

// Controls which row in the board will be interactive
let currentRow = 8;

// Gets the current active row
export function getCurrentRow(){
  return currentRow;
}

// Decrements the row to make the next one active
export function decrementCurrentRow(){
  // Makes sure currentRow doesn't become negative
  if(currentRow > 0)
    currentRow--;
}

// Stores user's guess by retrieving colors from the current active row 
export let userGuess = [];

// Empties the user guess array
export function emptyUserGuess(){
  const length = userGuess.length;

  for(let x = 0; x < length; x++){
    userGuess.pop();  // Pops everthing in array
  }
}

// Tells how good the user's guess was in a randomized order
export let validation = [];

// Empties the validation array
export function emptyValidation(){
  const length = validation.length;

  for(let x = 0; x < length; x++){
    validation.pop();  // Pops everthing in array
  }
}

// Indicates whether game is over or not
let isGameOver = false;

// Sets value of isGameOver
export function setIsGameOver(value){
  isGameOver = value;
}

// Returns value of isGameOver
export function getIsGameOver(){
  return isGameOver;
}

// Indicates whether the player has won or not
let isPlayerWon = false;

// Sets value of isPlayerWon
export function setIsPlayerWon(value){
  isPlayerWon = value;
}

// Returns value of isPlayerWon
export function getIsPlayerWon(){
  return isPlayerWon;
}

// Timer to keep track of how long the user has played the game
let sec = 0;
let min = 0;
let hr = 0;
let intervalId;   // Stores the interval id

// To update timer on the page
let timer = document.querySelector('.timer');

// Refreshes the timer on page
export function refreshTimer(value){
  timer.textContent = value;
}

// Starts the timer
export function startTimer(){
  intervalId = setInterval(() => {
     sec++;   // Increment sec after every second
     formatTime();  
     refreshTimer((padTime(hr) + ':' + padTime(min) + ':' + padTime(sec))); 
    }, 1000);
}

// Stops the timer
function stopTimer(){
  clearInterval(intervalId);  // Stops the interval
  saveTime(); 
}

// Formats time into Hours:Mins:Secs format
function formatTime(){
  if(sec === 59){
    min++;
    sec = 0;
  }

  if(min === 59){
    hr++;
    sec = 0;
    min = 0;
  }
}

// Pads time by adding 1 extra zero to the front to ensure that time always has two digits
function padTime(value){
  if(value < 10){
    return value.toString().padStart(2, '0');
  }
  else{
    return value;
  }
}

// Stores all prior and current times of the user
let savedTime = [];

// Saves time to local storage
function saveTime(){
  savedTime.push(timer.textContent);
  localStorage.setItem('time', JSON.stringify(savedTime));
}

// Retrieves time from local storage
export function retrieveTime(){
  savedTime = JSON.parse(localStorage.getItem('time')) || [];
}

// Code guesser's score
let score = [];

// Function to calculate score
export function calculateScore(){
  stopTimer();  

  if(isPlayerWon){  
    // If the player has won, calculate the score using the following formula
    score.push(((getCurrentRow()) * 10) + 20);
  }
  else{
    // Otherwise give a score of zero
    score.push(0);
  }

  saveScore();
}

// Returns the value of score
export function getScore(){
  return score[score.length - 1];
}

// Saves score to local storage
function saveScore(){
  localStorage.setItem('score', JSON.stringify(score));
}

// Retrieves score from local storage
export function retrieveScore(){
  score = JSON.parse(localStorage.getItem('score')) || [];
}

// Checks if duplicates are allowed
let allowDuplicates;

// Retieves allowDuplicates from local storage
export function retrieveAllowDuplicates(){
  allowDuplicates = JSON.parse(localStorage.getItem('allowDuplicates')) || false;
}

// Returns allow duplicates
export function getAllowDuplicates(){
  return allowDuplicates;
}

let circlesFilled = 0;

export function incrementCirclesFilled(){
  circlesFilled++;
  toggleCheckButton();
}

export function decrementCirclesFilled(){
  circlesFilled--;
  toggleCheckButton();
}

export function resetCirclesFilled(){
  circlesFilled = 0;
  toggleCheckButton();
}

export function getCirclesFilled(){
  return circlesFilled;
}