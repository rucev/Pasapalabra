//import { questions } from "./scripts/questions.js";

const hideItem = (item) => {
  item.classList.add("hidden");
};

const showItem = (item) => {
  item.classList.remove("hidden");
};

export const setDisplayToMatch = (buttonStart, buttonRank, usernameBar, buttonQuit, buttonSend, buttonPass, answerBar) => {
  hideItem(buttonStart);
  hideItem(buttonRank);
  hideItem(usernameBar);
  showItem(buttonQuit);
  showItem(buttonSend);
  showItem(buttonPass);
  showItem(answerBar);
};

export const setDisplayToMenu = (buttonStart, buttonRank, usernameBar, buttonQuit, buttonSend, buttonPass, buttonNext, answerBar) => {
  showItem(buttonStart);
  showItem(buttonRank);
  showItem(usernameBar);
  hideItem(buttonQuit);
  hideItem(buttonSend);
  hideItem(buttonPass);
  hideItem(buttonNext);
  hideItem(answerBar);
};

export const startGame = () => {
  
}

