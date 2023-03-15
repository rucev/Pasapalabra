import { setDisplayToMatch, setDisplayToMenu } from "./main.js";
import { questions } from "./questions.js";
import { setGameInfo } from "./game.js";

document.addEventListener("DOMContentLoaded", (event) => {
  let ranking = [];
  let username = "";
  let gameInfo = {};
  let turn = 0

/*TODO: load ranking local storage
  window.onload = (event) => {};
*/

  const letters = document.querySelectorAll(".letterCircle");
  let info = document.querySelector(".information");
  let usernameBar = document.querySelector(".name");
  let answerBar = document.querySelector(".answer");
  let buttonStart = document.querySelector(".start");
  let buttonRank = document.querySelector(".rank");
  let buttonQuit = document.querySelector(".quit");
  let buttonSend = document.querySelector(".send");
  let buttonPass = document.querySelector(".pass");
  let buttonNext = document.querySelector(".next");

  let letter = document.querySelector(".a");

  buttonStart.addEventListener("click", function (event) {
    event.preventDefault();
    setDisplayToMatch(
      buttonStart,
      buttonRank,
      usernameBar,
      buttonQuit,
      buttonSend,
      buttonPass,
      answerBar
    );
    username = document.querySelector(".name").value;
    gameInfo = setGameInfo(questions)
    info.innerHTML = gameInfo.questions[turn].question;
    letter.classList.add("focus");
    //TODO: add startGame 
  });

  buttonQuit.addEventListener("click", function (event) {
    event.preventDefault();
    setDisplayToMenu(
      buttonStart,
      buttonRank,
      usernameBar,
      buttonQuit,
      buttonSend,
      buttonPass,
      buttonNext,
      answerBar
    );
    letters.forEach((letter) => {
      letter.classList.remove("focus");
      letter.classList.remove("correct");
      letter.classList.remove("incorrect");
    });
    document.querySelector(".name").value = "";
    username = "";
    gameInfo = setGameInfo(questions)
    //TODO: save score to local storage 
  });


  buttonSend.addEventListener("click", function (event) {
    event.preventDefault();
    let userAnswer = document.querySelector(".answer").value.toLowerCase();
    if (gameInfo.questions[turn].answer === userAnswer) {
      letter.classList.add("correct");
      letter.classList.remove("focus");
      document.querySelector(".answer").value = "";
    } else {
      letter.classList.remove("focus");
      letter.classList.add("incorrect");
      document.querySelector(".answer").value = "";
    }
    turn += 1
    letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
    info.innerHTML = gameInfo.questions[turn].question;
    letter.classList.add("focus");
  });


});
