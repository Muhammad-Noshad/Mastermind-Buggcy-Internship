const message = document.querySelector('.message');
let timeoutId = '';

// A function for displaying a message
export function showMessage(text, color = 'white'){
  message.textContent = text;
  message.style.color = color;

  // If there is already a message being displayed, clear that message
  if(timeoutId){
    clearTimeout(timeoutId);
  }

  // After 3.5s, clear the message and replace it with space chaaracter
  timeoutId = setTimeout(() => { message.innerHTML = '&nbsp;'; }, 3500);
}