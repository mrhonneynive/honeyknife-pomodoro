let timeLeft = 10 * 60;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minutesDisplay.textContent = minutes.toString().padStart(2, "0");
  secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

updateTimerDisplay();

// timer functionality

let timer;
let isRunning = false;
let isWork = true;
const workDuration = 10 * 60;
const breakDuration = 1 * 60;
const breakIdeasDisplay = document.getElementById("breakIdeas");

function startTimer() {
  if (isRunning) {
    return;
  } else {
    // do nothing
  }

  isRunning = true;
  breakIdeasDisplay.innerHTML = "<p>work time!<p>";
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;

      isWork = !isWork;
      if (isWork) {
        timeLeft = workDuration;
      } else {
        timeLeft = breakDuration;
      }

      breakIdeasDisplay.innerHTML = `<p> ${
        isWork ? "work time!" : "break time!"
      } </p>`;
      updateTimerDisplay();
    }
  }, 1000);
}

const startButton = document.getElementById("start");
startButton.addEventListener("click", startTimer);

// pause functionality
function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
}
/*
  figured out how to resume
  NEW TODO:
  FIGURE OUT HOW TO COMBINE START AND PAUSE
*/
const pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", pauseTimer);

// reset functionality
function resetTimer() {
  isRunning = false;
  clearInterval(timer);
  timeLeft = 10 * 60;
  updateTimerDisplay();
}
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetTimer);
