import { setDisplayToMatch, setDisplayToMenu} from "./main.js";


const startMatch = () => {
    
}

document.addEventListener("DOMContentLoaded", (event) => {
  let ranking = [];
  let username = ""

  window.onload = (event) => {};

  let info = document.querySelector(".information");
  let usernameBar = document.querySelector(".name");
  let answerBar = document.querySelector(".answer");
  let buttonStart = document.querySelector(".start");
  let buttonRank = document.querySelector(".rank");
  let buttonQuit = document.querySelector(".quit");
  let buttonSend = document.querySelector(".send");
  let buttonPass = document.querySelector(".pass");

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
      answerBar
    );
  });
});
