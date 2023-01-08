// added variales for elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');

// added variables for timr and current state of quiz 
var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

function starts() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute('class', 'hide');

    questionsEl.removeAttribute('class');

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    getQuestion();
} 

function getQuestion() {
    // get question object from array
    var currentQuestion = questions[currentQuestionIndex];
  
    // update title with question
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
  
    choicesEl.innerHTML = '';
  
    for (var i = 0; i < currentQuestion.choices.length; i++) {
      var choice = currentQuestion.choices[i];
      var choiceNode = document.createElement('button');
      choiceNode.setAttribute('class', 'choice');
      choiceNode.setAttribute('value', choice);
  
      choiceNode.textContent = i + 1 + '. ' + choice;
  
      choicesEl.appendChild(choiceNode);
    }
  }
  
  function questionClick(event) {
    // get reference to feedback element
    var feedbackEl = document.getElementById('feedback');
  
    var buttonEl = event.target;
  
    if (!buttonEl.matches('.choice')) {
      return;
    }
  
    // check if correct
    if (buttonEl.value === questions[currentQuestionIndex].answer) {
      // show "Correct" message and green background
      feedbackEl.textContent = 'Correct';
      feedbackEl.style.backgroundColor = 'green';
    } else {
      // show "Wrong" message and red background
      feedbackEl.textContent = 'Wrong';
      feedbackEl.style.backgroundColor = 'red';
      // subtract 5 seconds from timer
      time -= 15;
    }
  
    // // flash right/wrong feedback
    feedbackEl.style.display = 'block';
    setTimeout(function () {
      feedbackEl.style.display = 'none';
    }, 1000);
  
    // next question
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (time <= 0 || currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }
  
  function quizEnd() {
    // stop timer
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');
  
    // show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute('class', 'hide');
  }
  
  function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }
  
  function saveHighscore() {
    var initials = initialsEl.value.trim();
  
    if (initials !== '') {
      var highscores =
        JSON.parse(window.localStorage.getItem('highscores')) || [];
  
      var newScore = {
        score: time,
        initials: initials,
      };
  
      // save scores 
      highscores.push(newScore);
      window.localStorage.setItem('highscores', JSON.stringify(highscores));
  
      //open highscores page
      window.location.href = 'highscores.html';
    }
  }
  
  function checkForEnter(event) {
    if (event.key === 'Enter') {
      saveHighscore();
    }
  }

submitBtn.onclick = saveHighscore;
startBtn.onclick = starts;
choicesEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;
