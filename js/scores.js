'use strict';

function calculateScores() {
  const players = JSON.parse(localStorage.getItem('users'))
    .sort(function (a, b) {
      return a.hiScore - b.hiScore;
    })
    .reverse();
  const scoreList = document.getElementById('scores-list');
  for (const player of players) {
    let el = document.createElement('li');
    el.innerText = `${player.userName}: ${player.hiScore}`;
    scoreList.appendChild(el);
  }
}

calculateScores();
