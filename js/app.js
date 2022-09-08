'use strict';
const gameMusic = new Audio('audio/Jeopardy-theme-song.mp3');
let questions;
let ans;
let val;
let currentUser = '';
let currentScore = 0;
let isAnswering = false;

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
  gameMusic.play();
  if(!isAnswering){
    isAnswering = true;
    let category = event.target.id.split('-')[0];
    let value = event.target.innerText;
    const displayBox = document.querySelector('#q-display>p');
    const { question, answer } = getQuestion(category, value);
    displayBox.innerText = question;
    val = value;
    ans = answer;
    document.getElementById('ans-submit').disabled = false;
    this.removeEventListener('click', onClick);
    this.style.backgroundColor = 'gray';
    this.style.pointerEvents = 'none';
    this.style.transition = 'transform 0.8s';
    this.style.transform = 'rotate(360deg)';
    this.style.color = 'red';
    this.style.perspective = '1000px';
  }
}

function checkAnswer(event) {
  event.preventDefault();
  let answer = new FormData(this).get('answer-input');
  document.getElementById('ans-submit').disabled = true;
  isAnswering = false;
  answer === ans ? correctAns() : wrongAns();
}

function correctAns(){
  const displayBox = document.querySelector('#q-display>p');
  displayBox.innerHTML = 'That is correct!';
  let disp = document.getElementById('score-display');
  currentScore += parseInt(val);
  disp.innerHTML = currentScore;
  //check hiscore and update
  updateHiScore();
  //let pick new q
}

function wrongAns(){
  const displayBox = document.querySelector('#q-display>p');
  displayBox.innerHTML = 'Nope, incorrect.';
  //let pick new q
}

function updateHiScore(){
  if (currentUser){
    let userList = JSON.parse(localStorage.getItem('users'));
    let userObj = userList.find((itm) => itm.userName === currentUser);
    let index = userList.indexOf(userObj);

    if (currentScore > userObj.hiScore){
      userObj.hiScore = currentScore;
      userList[index] = userObj;
      localStorage.setItem('users', JSON.stringify(userList));
    } else {
      console.log('user needs to register');
    }
  }
}

function startGame() {
  questions = createQuestions();
  registerUser();
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
  return user.addEventListener('submit', function (event) {
    event.preventDefault();
    let name = new FormData(user).get('user-name');
    currentUser = name;
    console.log(currentUser);

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
