const getRandomQuestion = (letterQuestions) => {
  return letterQuestions[Math.floor(Math.random() * letterQuestions.length)];
};

const setQuestionByLetter = (questions, letterPosition, letter) => {
  let question = {};
  const letterQuestions = questions[letterPosition];
  const randomQuestion = getRandomQuestion(letterQuestions);
  question.letter = letter;
  question.question = randomQuestion.question;
  question.answer = randomQuestion.answer;
  question.isAlreadyAnswered = false;
  return question;
};

const createQuestionsList = (questions) => {
  const alphabet = "abcdefghijklmnñopqrstuvwxyz"
  let questionList = [];
  for (let letterPosition = 0; letterPosition < alphabet.length; letterPosition++) {
    let letterQuestion = setQuestionByLetter(
      questions,
      letterPosition,
      alphabet[letterPosition]
    );
    questionList.push(letterQuestion);
  }
  return questionList;
};

export const setGameInfo = (questions, username) => {
  let gameInfo = {};
  gameInfo.questions = createQuestionsList(questions);
  gameInfo.isGameOver = false;
  gameInfo.user = username;
  gameInfo.round = 1;
  return gameInfo;
};

const skipToUnansweredQuestion = (gameInfo, turn) => {
  console.log(gameInfo.questions[turn].isAlreadyAnswered)
  if(gameInfo.questions[turn].isAlreadyAnswered === true){
    turn < 26 ? turn += 1 : turn = 0;
    return skipToUnansweredQuestion(gameInfo, turn)
  } else {
    return turn;
  }
}

export const setNextTurn = (gameInfo, turn, letter) => {
  letter.classList.remove("focus");
  turn < 26 ? turn += 1 : turn = 0;
  turn = skipToUnansweredQuestion(gameInfo, turn);
  return turn
}



