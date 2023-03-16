import { displayGame, displayMenu, uploadAnswer, displayQuestion, hideItem, showItem, cleanScreen } from "./displayTools.js";
import { questions } from "./questions.js";
import { setGameInfo, setNextTurn } from "./gameTools.js";

document.addEventListener("DOMContentLoaded", (event) => {
  let ranking = [];
  let username = "";
  let gameInfo = {};
  let turn = 0;
  let count = 0;

/*TODO: load ranking local storage
  window.onload = (event) => {};
*/

  const letters = document.querySelectorAll(".letterCircle");
  let info = document.querySelector(".information");
  let score = document.querySelector(".score");
  let usernameBar = document.querySelector(".name");
  let answerBar = document.querySelector(".answer");
  let buttonStart = document.querySelector(".start");
  let buttonRank = document.querySelector(".rank");
  let buttonQuit = document.querySelector(".quit");
  let buttonSend = document.querySelector(".send");
  let buttonPass = document.querySelector(".pass");
  let buttonNext = document.querySelector(".next");

  let letter = document.querySelector(".a");

  buttonStart.addEventListener("click", (event) => {
    event.preventDefault();
    displayGame(buttonStart, buttonRank, usernameBar, buttonQuit, buttonSend, buttonPass, answerBar);
    username = document.querySelector(".name").value;
    gameInfo = setGameInfo(questions, username)
    displayQuestion(gameInfo, turn, info)
  });

  buttonQuit.addEventListener("click", (event) => {
    event.preventDefault();
    displayMenu(buttonStart, buttonRank, usernameBar, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar);
    cleanScreen(letters, score, info)
    username = "";
    gameInfo = {};
    turn = 0;
    //TODO: save score to local storage 
  });

  buttonSend.addEventListener("click", (event) => {
    event.preventDefault();
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    let userAnswer = document.querySelector(".answer").value.toLowerCase();
    gameInfo = uploadAnswer(gameInfo, turn, userAnswer, letter)
    if(gameInfo.questions[turn].isAnsweredCorrectly === false) {
      hideItem(buttonSend, buttonPass, answerBar);
      showItem(buttonNext)
      info.innerHTML = `¡Oooh! la respuesta correcta era ${gameInfo.questions[turn].answer.toUpperCase()}`;
    } else {
      count += 1
      score.innerHTML = count;
      letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
      turn = setNextTurn(gameInfo, turn, letter);
      displayQuestion(gameInfo, turn, info)
    }
  });

  buttonNext.addEventListener("click", (event) => {
    event.preventDefault();
    showItem(buttonSend, buttonPass, answerBar);
    hideItem(buttonNext)
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    turn = setNextTurn(gameInfo, turn, letter);
    displayQuestion(gameInfo, turn, info)
  });

  buttonPass.addEventListener("click", (event) => {
    event.preventDefault();
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    turn = setNextTurn(gameInfo, turn, letter);
    displayQuestion(gameInfo, turn, info)
  });


});

