'use strict';

let questions;
let ans;

function randomQuestion(category) {
  const idx = Math.floor(Math.random() * 5);
  return questions.filter((itm) => itm.category.toLowerCase() === category)[
    idx
  ];
}

const User = function (name, hiScore = 0) {
  this.userName = name;
  this.hiScore = hiScore;
};

const Question = function (category, q, a) {
  this.question = q;
  this.answer = a;
  this.category = category;
};

function populateBoard() {
  const topics = document.getElementById('questions').children;
  for (const topic of topics) {
    for (let i = 2; i <= 10; i += 2) {
      let el = document.createElement('div');
      el.id = `${topic.id}-${i * 100}`;
      el.innerText = `${i * 100}`;
      el.addEventListener('click', onClick);
      topic.appendChild(el);
    }
  }
}

function onClick(event) {
  event.preventDefault();
  let category = event.target.id.split('-')[0];
  const displayBox = document.querySelector('#q-display>p');
  const { question, answer } = randomQuestion(category);
  displayBox.innerText = question;
  ans = answer;
  this.removeEventListener('click', onClick);
}

function checkAnswer(event) {
  event.preventDefault();
  let answer = new FormData(this).get('answer-input');
  answer === ans ? console.log(true) : console.log(false);
}

function startGame() {
  const user = registerUser();
  localStorage.setItem('users', JSON.stringify(user));
  questions = createQuestions();
  document.getElementById('input').addEventListener('submit', checkAnswer);
}

function createQuestions() {
  const quests = [];
  for (const value of Object.values(QUESTIONS)) {
    for (let { category, question, answer } of value) {
      let quest = new Question(category, question, answer);
      quests.push(quest);
    }
  }
  return quests;
}

function registerUser() {
  const user = document.getElementById('user');
  user.addEventListener('submit', function (event) {
    event.preventDefault();
    let name = new FormData(user).get('user-name');
    // check localStorage to see if User is already registered
    if (alreadyRegistered(name)) {
      const users = JSON.parse(localStorage.users);
      for (const user of users) {
        if (user.name === name) {
          return new User(name, user.hiScore);
        }
      }
    }
    return new User(name, 0);
  });
}

function alreadyRegistered(user) {
  const exists = JSON.parse(localStorage.getItem('users'))
    .map((obj) => {
      return obj.userName;
    })
    .includes(user)
    ? true
    : false;
  return exists;
}

startGame();
createQuestions();
populateBoard();
