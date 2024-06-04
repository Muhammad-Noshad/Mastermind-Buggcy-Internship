// Retreive score from local storage
let score = JSON.parse(localStorage.getItem('score'));

// Retreive time from local storage
let time = JSON.parse(localStorage.getItem('time'));

if(score === null){   // If there is no score
  const pElemScore = document.createElement('p');
  pElemScore.textContent = 'No scores to show!';

  const pElemTime = document.createElement('p');
  pElemTime.textContent = 'No times to show!';

  document.querySelector('.wrapper').appendChild(pElemScore);
  document.querySelector('.wrapper').appendChild(pElemTime);
}
else{   // Otherwise, display the scores and times
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