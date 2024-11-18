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

function startTimer() {
  if (isRunning) {
    return;
  } else {
    // do nothing
  }

  isRunning = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert("time's up");
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
  TODO:
  FIGURE OUT HOW TO RESUME
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
