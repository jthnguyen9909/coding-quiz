function displayScores() {
  // gets localStorage values or creates empty array if none exist
  var highScores = JSON.parse(localStorage.getItem("highscores")) || [];

  // sorts items in localStorage by score value
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });

  // creates a new list item for every initial and score submitted
  for (var i = 0; i < highScores.length; i++) {
    var liScore = document.createElement("li");
    liScore.textContent =
      i + 1 + ". " + highScores[i].initial + " - " + highScores[i].score;

    var listEl = document.querySelector("#highscoreslist");
    listEl.appendChild(liScore);
  }
}
// function to clear localStorage
function clearScores() {
  localStorage.removeItem("highscores");
  location.reload();
}

// calls function clearScores on button click
var clearButton = document.querySelector("#clear-scores");
clearButton.addEventListener("click", clearScores);

// function is called on page load
displayScores();
