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
  return gameInfo;
};

const skipToUnansweredQuestion = (gameInfo, turn) => {
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
  checkIsGameOver(gameInfo) ? turn = -1 : turn = skipToUnansweredQuestion(gameInfo, turn)
  return turn
}

const checkIsGameOver = (gameInfo) => {
  return gameInfo.questions.every((question) => question.isAlreadyAnswered === true);
};

export const countErrors = (gameInfo) => {
  let errors = gameInfo.questions.filter((question) => question.isAnsweredCorrectly === false)
  return errors.length;
};

export const updateRanking = (gameInfo, count, ranking) => {
  const errors = countErrors(gameInfo)
  let finalScore = {};
  gameInfo.user === undefined || gameInfo.user === "" ? finalScore.username = "Sin Nombre" : finalScore.username = gameInfo.user;
  finalScore.score = count;
  finalScore.errors = errors
  finalScore.relativeScore = count - errors
  ranking.push(finalScore);
  return ranking
}

export const saveRanking = (ranking) => {
  localStorage.setItem("save-pasapalabra", JSON.stringify(ranking));
};

export const loadRanking = () => {
  let data = localStorage.getItem("save-pasapalabra");
  if (data !== null) {
    return JSON.parse(data);
  } else {
    return [];
  };
};

export const getHighScores = (ranking) => {
  ranking.sort((a, b) => b.score - a.score);
  let limit = ranking.length < 3 ? ranking.length : 3;
  let topScores = [];
  for (let i = 0; i < limit; i++) {
    if(!topScores.includes(ranking[i])){
      if(ranking[i].relativeScore === ranking[i].score){
        topScores.push(ranking[i]);
      };
      let sameScore = ranking.filter((otherScores) => otherScores.score === ranking[i].score);
      let lessErrors = sameScore.filter((otherScores) => otherScores.errors < ranking[i].errors);
      if(sameScore.length === 1 && lessErrors.length === 0){
        topScores.push(ranking[i]);
      } else {
        lessErrors.sort((a, b) => b.score - a.score);
        topScores.push(lessErrors[0])
        lessErrors.length > 1 ? topScores.push(lessErrors[1]) : topScores.push(ranking[i])
      };
    };
  };
  topScores.length < 3 ? topScores : [topScores[0], topScores[1], topScores[2]];
  console.log(topScores)
  return topScores;
};