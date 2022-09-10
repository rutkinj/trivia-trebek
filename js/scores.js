'use strict';

const User = function(name, score) {
  this.userName = name;
  this.hiScore = score;
};

function calculateScores() {
  const scoreList = Array.from(document.getElementById('scores-list').children, (el) => {
    const [name, score] = el.innerText.split(': ');
    return new User(name, score);
  });
  const players = JSON.parse(localStorage.getItem('users')).concat(scoreList)
    .sort(function (a, b) {
      return a.hiScore - b.hiScore;
    })
    .reverse();
  document.getElementById('scores-list').innerHTML = '';
  document.getElementById('scores-list').insertAdjacentHTML('beforeend', `${players.map((player) => {
    return `<li>${player.userName}: ${player.hiScore}</li>`;
  }).join('')}`);
}

calculateScores();
