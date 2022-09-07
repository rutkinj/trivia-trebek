'use strict';

let questions;
let ans;

function getQuestion(category, value) {
  return questions.filter(
    (itm) =>
      itm.category.toLowerCase() === category &&
      parseInt(itm.value) === parseInt(value)
  )[0];
}

const User = function (name, hiScore = 0) {
  this.userName = name;
  this.hiScore = hiScore;
};

const Question = function (category, q, a, v) {
  this.question = q;
  this.answer = a;
  this.category = category;
  this.value = v;
};

function populateBoard() {
  const topics = document.getElementById('questions').children;
  for (const topic of topics) {
    for (let i = 2; i <= 10; i += 2) {
      let el = document.createElement('div');
      el.id = `${topic.id}-${i * 100}`;
      el.innerText = `${i * 100}`;
      el.className = 'board-box';
      el.addEventListener('click', onClick);
      topic.appendChild(el);
    }
  }
}

function onClick(event) {
  event.preventDefault();
  let category = event.target.id.split('-')[0];
  let value = event.target.innerText;
  const displayBox = document.querySelector('#q-display>p');
  const { question, answer } = getQuestion(category, value);
  displayBox.innerText = question;
  ans = answer;
  this.removeEventListener('click', onClick);
  this.style.backgroundColor = 'gray';
  this.style.pointerEvents = 'none';
}

function checkAnswer(event) {
  event.preventDefault();
  let answer = new FormData(this).get('answer-input');
  answer === ans ? console.log(true) : console.log(false);
}

function startGame() {
  localStorage.setItem('users', JSON.stringify([]));
  questions = createQuestions();
  registerUser();
  document.getElementById('input').addEventListener('submit', checkAnswer);
}

function createQuestions() {
  const quests = [];
  for (const qObj of Object.values(QUESTIONS)) {
    for (let { category, question, answer, value } of qObj) {
      let quest = new Question(category, question, answer, value);
      quests.push(quest);
    }
  }
  return quests;
}

function registerUser() {
  const user = document.getElementById('user');
  return user.addEventListener('submit', function (event) {
    event.preventDefault();
    let name = new FormData(user).get('user-name');
    console.log(alreadyRegistered(name));
  });
}

function alreadyRegistered(name) {
  const exists = JSON.parse(localStorage.getItem('users'));
  const existingUser = exists.find((itm) => itm.userName === name);
  if (existingUser) {
    return existingUser;
  } else {
    const user = new User(name, 0);
    exists.push(user);
    localStorage.setItem('users', JSON.stringify(exists));
    return user;
  }
}

startGame();
populateBoard();
