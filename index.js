'use strict';

const Game = function (player) {
  this.player = player;
  this.questions = [];
};

Game.prototype.randomQuestion = function () {
  const idx = Math.floor(Math.random() * this.questions.length);
  return this.questions[idx];
};

const User = function (name, hiScore = 0) {
  this.userName = name;
  this.hiScore = hiScore;
};

const Question = function (q, a) {
  this.question = q;
  this.answer = a;
};

function populateBoard() {
  const topics = document.getElementById('questions').children;
  for (const topic of topics) {
    for (let i = 2; i <= 10; i += 2) {
      let el = document.createElement('div');
      el.innerText = `${i * 100}`;
      topic.appendChild(el);
    }
  }
}

function testLocalStorage() {
  const users = [
    new User('ben', 200),
    new User('joe', 400),
    new User('marc', 450),
    new User('megan', 300),
    new User('diego', 500),
  ];
  localStorage.setItem('users', JSON.stringify(users));
}

function startGame() {
  const game = new Game(new User('ben'));
  for (let i = 0; i < 20; i++) {
    let question = new Question(
      'what is the air speed velocity of an unladen swallow?',
      'African or European?'
    );
    game.questions.push(question);
  }
  return game;
}

function registerUser() {
  const user = document.getElementById('user');
  user.addEventListener('submit', function (event) {
    event.preventDefault();
    let name = new FormData(user).get('user-name');
    // check localStorage to see if User is already registered
    if (alreadyRegistered(name)) {
      console.log('Welcome back!');
    }
  });
}

function alreadyRegistered(user) {
  const exists = JSON.parse(localStorage.getItem('users'))
    .map((obj) => {
      return obj.userName;
    })
    .includes(user)
    ? true // new User(user)
    : false;
  return exists;
}

startGame();
testLocalStorage();
registerUser();
populateBoard();
