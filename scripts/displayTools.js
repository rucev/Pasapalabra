export const hideItem = (...items) => {
  items.forEach((item) => {
    item.classList.add("hidden");
  });
};

export const showItem = (...items) => {
  items.forEach((item) => {
    item.classList.remove("hidden");
  });
};

export const displayGame = (
  buttonStart,
  buttonRank,
  usernameBar,
  buttonQuit,
  buttonSend,
  buttonPass,
  answerBar
) => {
  hideItem(buttonStart, buttonRank, usernameBar);
  showItem(buttonQuit, buttonSend, buttonPass, answerBar);
};

export const displayMenu = (
  buttonStart,
  buttonRank,
  usernameBar,
  buttonQuit,
  buttonSend,
  buttonPass,
  buttonNext,
  answerBar
) => {
  showItem(buttonStart, buttonRank, usernameBar);
  hideItem(buttonQuit, buttonSend, buttonPass, buttonNext, answerBar);
};

export const displayQuestion = (gameInfo, turn, info) => {
  let letter = document.querySelector(`.${gameInfo.questions[turn].letter}`);
  info.innerHTML = gameInfo.questions[turn].question;
  letter.classList.add("focus");
};

export const uploadAnswer = (gameInfo, turn, userAnswer, letter) => {
  gameInfo.questions[turn].isAlreadyAnswered = true;
  if (gameInfo.questions[turn].answer === userAnswer) {
    letter.classList.add("correct");
    letter.classList.remove("focus");
    document.querySelector(".answer").value = "";
    gameInfo.questions[turn].isAnsweredCorrectly = true;
  } else {
    letter.classList.remove("focus");
    letter.classList.add("incorrect");
    document.querySelector(".answer").value = "";
    gameInfo.questions[turn].isAnsweredCorrectly = false;
  }
  return gameInfo;
};

export const cleanScreen = (letters, score, info) => {
  letters.forEach((letter) => {
    letter.classList.remove("focus");
    letter.classList.remove("correct");
    letter.classList.remove("incorrect");
  });
  document.querySelector(".name").value = "";
  score.innerHTML = 0;
  info.innerHTML = "Para jugar introduce tu nombre. Envia la respuesta de cada pregunta pulsando el botón enviar, pasa pulsando el botón pasapalabra. ¡Controla tanto el tiempo como tus fallos!";
};
