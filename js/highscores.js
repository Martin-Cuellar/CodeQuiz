function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    for (var i = 0; i < highscores.length; i += 1) {
      var liTag = document.createElement('li');
      liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;
  
      var olEl = document.getElementById('highscores');
      olEl.appendChild(liTag);
    }
  }
  function clearHighscores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
  }
  
  document.getElementById('clear').onclick = clearHighscores;
  
  printHighscores();