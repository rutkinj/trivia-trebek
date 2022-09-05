'use strict';

const Game = function (player) {
  this.player = player;
  this.questions = [];
};

const User = function (name, hiScore = 0) {
  this.userName = name;
  this.hiScore = hiScore;
};

const Question = function (q, a) {
  this.question = q;
  this.answer = a;
};

function startGame() {
  const game = new Game(new User('ben'));
  for (let i = 0; i < 20; i++) {
    let question = new Question(
      'what is the air speed velocity of an unladen swallow?',
      'African or European?'
    );
    game.questions.push(question);
  }
}

function registerUser() {
  const user = document.getElementById('user');
  user.addEventListener('submit', function (event) {
    event.preventDefault();
    // check localStorage to see if User is already registered
    if (alreadyRegistered()) {
      console.log('Welcome back!');
    }
    console.log('This is JSParty');
  });
}

function alreadyRegistered(user) {
  const exists = JSON.parse(localStorage.getItem('users')).includes(user)
    ? true // new User(user)
    : false;
  return exists;
}

startGame();
registerUser();
