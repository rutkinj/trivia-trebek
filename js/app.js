'use strict';

let questions;
let ans;
let val;
let currentScore = 0;

// function randomQuestion(category) {
//   const idx = Math.floor(Math.random() * 5);
//   return questions.filter((itm) => itm.category.toLowerCase() === category)[
//     idx
//   ];
// }

function getQuestion(category, value){
  return questions.filter(
    (itm) => itm.category.toLowerCase() === category &&
    parseInt(itm.value) === parseInt(value))[0];
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
  val = value;
  ans = answer;
  document.getElementById('ans-submit').disabled = false;
  this.removeEventListener('click', onClick);
}

function checkAnswer(event) {
  event.preventDefault();
  let answer = new FormData(this).get('answer-input');
  document.getElementById('ans-submit').disabled = true;
  answer === ans ? correctAns() : console.log(false);
}

function correctAns(){
  const displayBox = document.querySelector('#q-display>p');
  displayBox.innerHTML = 'That is correct!';
  let disp = document.getElementById('score-display');
  console.log(currentScore);
  currentScore += parseInt(val);
  disp.innerHTML = currentScore;
  //check hiscore and update
  //let pick new q
}

function wrongAns(){
  const displayBox = document.querySelector('#q-display>p');
  displayBox.innerHTML = 'Nope, incorrect.';
  //let pick new q
}

function startGame() {
  const user = registerUser();
  localStorage.setItem('users', JSON.stringify(user));
  questions = createQuestions();
  document.getElementById('input').addEventListener('submit', checkAnswer);
  document.getElementById('ans-submit').disabled = true;
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
console.log(questions);
populateBoard();
