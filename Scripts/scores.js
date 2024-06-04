let score = JSON.parse(localStorage.getItem('score'));
let time = JSON.parse(localStorage.getItem('time'));

console.log(localStorage);
console.log(score);
console.log(time);
localStorage.clear();

if(score === null){
  const pElemScore = document.createElement('p');
  pElemScore.textContent = 'No scores to show!';

  const pElemTime = document.createElement('p');
  pElemTime.textContent = 'No times to show!';

  document.querySelector('.wrapper').appendChild(pElemScore);
  document.querySelector('.wrapper').appendChild(pElemTime);
}
else{
  let pElemScore;
  let pElemTime;

  for(let x = 0; x < score.length; x++){
    pElemScore = document.createElement('p');
    pElemScore.textContent = score[x];

    pElemTime = document.createElement('p');
    pElemTime.textContent = time[x];

    document.querySelector('.wrapper').appendChild(pElemScore);
    document.querySelector('.wrapper').appendChild(pElemTime);
  }
}