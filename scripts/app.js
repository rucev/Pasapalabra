import { setDisplayToMatch, setDisplayToMenu } from "./main.js";

document.addEventListener("DOMContentLoaded", (event) => {
  let ranking = [];
  let username = "";

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
    //TODO: save score to local storage 
  });
});
