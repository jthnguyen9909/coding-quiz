function displayScores() {
  var highScores = JSON.parse(localStorage.getItem("highscores")) || [];

  highScores.sort(function (a, b) {
    return b.score - a.score;
  });

  for (var i = 0; i < highScores.length; i++) {
    var liScore = document.createElement("li");
    liScore.textContent =
      i + 1 + ". " + highScores[i].initial + " - " + highScores[i].score;

    var listEl = document.querySelector("#highscoreslist");
    listEl.appendChild(liScore);
  }
}
function clearScores() {
  localStorage.removeItem("highscores");
  location.reload();
}

var clearButton = document.querySelector("#clear-scores");

clearButton.addEventListener("click", clearScores);

displayScores();
