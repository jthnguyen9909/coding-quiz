var timerEl = document.querySelector("#time-left");
var startButton = document.querySelector("#start-button");
var startCardEl = document.querySelector(".start-game-card");
var questionCardEl = document.querySelector(".question-card");
var choicesEl = document.querySelector(".choices");
var answerEl = document.querySelector(".answer");
var initialEl = document.querySelector("#initial-input");
var submitButton = document.querySelector("#submit-button");
var timerFunction;
var currentQuestionIndex = 0;

// starting time
var timerCount = 100;

// sound effects
var sfxRight = new Audio("assets/sfx/right.m4r");
var sfxWrong = new Audio("assets/sfx/wrong.m4r");
var sfxFailed = new Audio("assets/sfx/failed.m4r");

// set audio volume
sfxRight.volume = 0.2;
sfxWrong.volume = 0.2;
sfxFailed.volume = 0.2;

// start game functions
function startGame() {
  startCardEl.setAttribute("class", "hide");

  questionCardEl.removeAttribute("class", "hide");

  timerFunction = setInterval(startTimer, 1000);

  timerEl.textContent = timerCount;

  getQuestions();
}

// function to get question from questionsList array
function getQuestions() {
  // sets currentQuestion variable to first item in questionsList array
  var currentQuestion = questionsList[currentQuestionIndex];

  // sets title object of currentQuestion to display as question-header
  var titleEl = document.querySelector(".question-header");
  titleEl.textContent = currentQuestion.title;

  // clears out previous choices if any
  choicesEl.textContent = "";

  // for loop for creating a button for each choice for the currentQuestion
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choice");
    choiceButton.setAttribute("value", choice);

    // assigning a letter to each choice up to 6 choices
    var choiceLetter = ["a", "b", "c", "d", "e", "f"];
    choiceButton.textContent = choiceLetter[i] + ". " + choice;
    choicesEl.appendChild(choiceButton);
  }
}

// function on clicking a choice button event
function choiceClick(event) {
  var buttonEl = event.target;

  // nothing happens if not clicking on a choice button
  if (!buttonEl.matches(".choice")) {
    return;
  }
  // if the answer chosen is correct
  if (buttonEl.value === questionsList[currentQuestionIndex].answer) {
    answerEl.textContent =
      "Corrent! The answer was: " + questionsList[currentQuestionIndex].answer;

    sfxRight.play();
  }

  // if the answer chosen is incorrect
  if (buttonEl.value !== questionsList[currentQuestionIndex].answer) {
    timerCount -= 15;

    answerEl.textContent = "Wrong!";

    // plays wrong sound effect
    sfxWrong.play();

    // ends game if counter reaches zero
    if (timerCount <= 0) {
      timerCount = 0;
      var failedEl = document.querySelector(".failed");
      failedEl.removeAttribute("class", "hide");

      failedEl.textContent = "You got 0 points... Did you even try?";

      sfxFailed.play();
      quizEnd();
    }

    // updates timer counter after subtraction
    timerEl.textContent = timerCount;
  }

  // displays whether answer is correct or not for 1 second
  answerEl.removeAttribute("class", "hide");
  setTimeout(function () {
    answerEl.setAttribute("class", "hide");
  }, 1000);

  // moves on to next question
  currentQuestionIndex++;

  // ends quiz if out of questions
  if (currentQuestionIndex === questionsList.length) {
    quizEnd();
  } else {
    getQuestions();
  }
}

// quiz finish screen
function quizEnd() {
  var finishScreen = document.querySelector(".quiz-finished");
  finishScreen.removeAttribute("class", "hide");

  questionCardEl.setAttribute("class", "hide");

  clearInterval(timerFunction);

  var finalScoreEl = document.querySelector("#final-score");
  finalScoreEl.textContent = timerCount;
}

function startTimer() {
  timerCount--;
  timerEl.textContent = timerCount;

  // in the case that you score a 0
  if (timerCount <= 0) {
    var failedEl = document.querySelector(".failed");
    failedEl.removeAttribute("class", "hide");

    failedEl.textContent = "You got 0 points... Did you even try?";

    sfxFailed.play();

    // updates timer counter
    timerEl.textContent = timerCount;
    quizEnd();
  }
}

function saveScore() {
  // gets value of form and removes extra spaces around with trim
  var initial = initialEl.value.trim();

  // makes sure there is a value in the initials form
  if (initial !== "") {
    // gets localStorage scores; if there is none, then creates empty array
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    // score object
    var newScore = {
      score: timerCount,
      initial: initial,
    };

    // pushes newScore into localStorage highscores array
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));

    location.href = "highscores.html";
  }
}

// function for submitting form when pressing enter
function enterToSubmit(event) {
  if (event.key === "Enter") {
    saveScore();
  }
}

// event listeners for clicking on associated buttons
startButton.addEventListener("click", startGame);
choicesEl.addEventListener("click", choiceClick);
submitButton.addEventListener("click", saveScore);

// after keyup event, waits for enter key to be pressed to submit
initialEl.addEventListener("keyup", enterToSubmit);
