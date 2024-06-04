// Range of available colors
export const colors = ['red', 'green', 'blue', 'yellow', 'brown', 'orange', 'black', 'white'];

// Computer generated code
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
  console.log(currentRow);
  if(currentRow > 0)
    currentRow--;
}

// Stores user's guess by retrieving colors from the current active row 
export let userGuess = [];

// Empties the user guess array
export function emptyUserGuess(){
  const length = userGuess.length;
  for(let x = 0; x < length; x++){
    userGuess.pop();
  }
}

// Tells how good the user's guess was in a randomized order
export let validation = [];

// Empties the validation array
export function emptyValidation(){
  const length = validation.length;
  for(let x = 0; x < length; x++){
    validation.pop();
  }
}

let isGameOver = false;

export function setIsGameOver(value){
  isGameOver = value;
}

export function getIsGameOver(){
  return isGameOver;
}

let isPlayerWon = false;

export function setIsPlayerWon(value){
  isPlayerWon = value;
}

export function getIsPlayerWon(){
  return isPlayerWon;
}

// Timer
let sec = 0;
let min = 0;
let hr = 0;
let intervalId;

// To update timer
let timer = document.querySelector('.timer');

export function refreshTimer(value){
  timer.textContent = value;
}

export function startTimer(){
  intervalId = setInterval(() => {
     sec++;
     formatTime();
     refreshTimer((padTime(hr) + ':' + padTime(min) + ':' + padTime(sec))) 
    }, 1000);
}

function stopTimer(){
  clearInterval(intervalId);
  saveTime();
  console.log(hr, min, sec);
}

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

function padTime(value){
  if(value < 10){
    return value.toString().padStart(2, '0');
  }
  else{
    return value;
  }
}

let savedTime = [];

function saveTime(){
  savedTime.push(timer.textContent);
  localStorage.setItem('time', JSON.stringify(savedTime));
  console.log(savedTime);
}

export function retrieveTime(){
  savedTime = JSON.parse(localStorage.getItem('time')) || [];
  console.log('time:', savedTime);
}

// Code guesser's score
let score = [];

export function calculateScore(){
  stopTimer();

  if(isPlayerWon){
    score.push(((getCurrentRow()) * 10) + 20);
  }
  else{
    score.push(0);
  }

  saveScore();
}

export function getScore(){
  return score[score.length - 1];
}

function saveScore(){
  localStorage.setItem('score', JSON.stringify(score));
  console.log(localStorage);
}

export function retrieveScore(){
  score = JSON.parse(localStorage.getItem('score')) || [];
  console.log('score:', score);
}