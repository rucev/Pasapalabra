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

const displayQuestion = (questionInfo, letter, displayInfo) => {
  displayInfo.innerHTML = questionInfo.question;
  letter.classList.add("focus");
};

const answerQuestion = (questionInfo, buttonSend, buttonPass) => {
  let userAnswer = "";
  buttonSend.addEventListener("click", function (event) {
    event.preventDefault();
    userAnswer = document.querySelector(".answer").value.toLowerCase();
    if (questionInfo.answer === userAnswer) {
      letter.classList.add("correct");
      letter.classList.remove("focus");
      document.querySelector(".answer").value = "";
    } else {
      letter.classList.remove("focus");
      letter.classList.add("incorrect");
      document.querySelector(".answer").value = "";
    }
  });
  buttonPass.addEventListener("click", function (event) {
    event.preventDefault();
    letter.classList.remove("focus");
    document.querySelector(".answer").value = "";
  });
  
};

/* TODO: look how to add this:
    if (gameInfo.questions[i].isAnsweredCorrectly === false) {
      displayInfo.innerHTML = "Oooh, la respuesta correcta era " + questionInfo.answer;
      buttonNext.classList.remove("hidden");
      buttonPass.classList.add("hidden");
      buttonSend.classList.add("hidden");
      buttonNext.addEventListener("click", function (event) {
        event.preventDefault();
        buttonNext.classList.add("hidden");
        buttonPass.classList.remove("hidden");
        buttonSend.classList.remove("hidden");
        return playRound(
          gameInfo,
          displayInfo,
          buttonSend,
          buttonPass,
          buttonNext,
          i + 1
        );
      });
*/

//TODO: fix game loop

const playGame = (displayInfo, buttonSend, buttonPass, buttonNext) => {
  let questionList = createQuestionsList(questions);
  const alphabet = "abcdefghijklmnñopqrstuvwxyz"
  for(let char = 0; char < alphabet.length; char++) {
    let letter = document.querySelector(`.${alphabet[char]}`);
    displayQuestion(questionList[char], letter, displayInfo)
    answerQuestion(questionList[char], buttonSend, buttonPass)
  }


};
