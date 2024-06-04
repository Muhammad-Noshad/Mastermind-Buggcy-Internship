const message = document.querySelector('.message');
let timeoutId = '';

// A function for displaying an error message
export function showMessage(text, color = 'white'){
  message.textContent = text;
  message.style.color = color;

  if(timeoutId){
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => { message.innerHTML = '&nbsp;'; }, 3500);
}