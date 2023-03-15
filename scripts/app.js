import { setDisplayToMatch, setDisplayToMenu } from "./main.js";
import { setGameInfo, playAllRounds } from "./game.js";
import { questions } from "./questions.js";

const displayQuestion = (questionInfo, displayInfo) => {
  displayInfo.innerHTML = questionInfo.question;
  let letter = document.querySelector(`.${questionInfo.letter}`);
  letter.classList.add("focus");
};

const answerQuestion = (questionInfo, displayInfo, buttonSend, buttonPass, buttonNext) => {
  let userAnswer = "";
  let letter = document.querySelector(`.${questionInfo.letter}`);
  buttonSend.addEventListener("click", function (event) {
    event.preventDefault();
    userAnswer = document.querySelector(".answer").value.toLowerCase();

    if (questionInfo.answer === userAnswer) {
      letter.classList.add("correct");
      letter.classList.remove("focus");
      questionInfo.isAnsweredCorrectly = true;
      document.querySelector(".answer").value = "";
    } else {
      letter.classList.remove("focus");
      letter.classList.add("incorrect");
      questionInfo.isAnsweredCorrectly = false;
      document.querySelector(".answer").value = "";
    }
  });
  buttonPass.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".answer").value = "";
  });

  if (questionInfo.isAnsweredCorrectly === false) {
    displayInfo.innerHTML = "Oooh, la respuesta correcta era " + questionInfo.answer;
    buttonNext.classList.remove("hidden");
    buttonPass.classList.add("hidden");
    buttonSend.classList.add("hidden");
    buttonNext.addEventListener("click", function (event) {
      event.preventDefault();
      buttonNext.classList.add("hidden");
      buttonPass.classList.remove("hidden");
      buttonSend.classList.remove("hidden");
    })
}
  return questionInfo;
};

const playRound = (
  gameInfo,
  displayInfo,
  buttonSend,
  buttonPass,
  buttonNext,
  i = 0
) => {
  if (i === 26) {
    return gameInfo;
  } else if (gameInfo.questions[i].isAlreadyAnswered === false) {
    displayQuestion(gameInfo.questions[i], displayInfo);
    gameInfo.questions[i] = answerQuestion(
      gameInfo.questions[i],
      displayInfo,
      buttonSend,
      buttonPass,
      buttonNext
    );
        return playRound(
          gameInfo,
          displayInfo,
          buttonSend,
          buttonPass,
          buttonNext,
          i + 1
        );
    } else {
    return playRound(
      gameInfo,
      displayInfo,
      buttonSend,
      buttonPass,
      buttonNext,
      i + 1
    );
  }
};

const playGame = (displayInfo, buttonSend, buttonPass, buttonNext) => {
  let gameInfo = setGameInfo(questions);
  //gameInfo = playRound(gameInfo, displayInfo, buttonSend, buttonPass, buttonNext)
  //askQuestion(gameInfo.questions[0], displayInfo)
  //answerQuestion(gameInfo.questions[0], buttonSend, buttonPass)
  gameInfo = playRound(
    gameInfo,
    displayInfo,
    buttonSend,
    buttonPass,
    buttonNext
  )
  console.log(gameInfo);
};

document.addEventListener("DOMContentLoaded", (event) => {
  let ranking = [];
  let username = "";

  window.onload = (event) => {};

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
    playGame(info, buttonSend, buttonPass, buttonNext);
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
  });
});
