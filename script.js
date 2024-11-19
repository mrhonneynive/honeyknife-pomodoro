let timeLeft = 1 * 10;

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
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;

      isWork = !isWork;
      if (isWork) {
        clearBreakIdeas();
        timeLeft = workDuration;
      } else {
        showBreakIdeas();
        timeLeft = breakDuration;
      }
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

// add music functionality

const backgroundMusicDisplay = document.getElementById("backgroundMusic");
const toggleMusicButton = document.getElementById("toggleMusic");
function toggleMusic() {
  if (backgroundMusicDisplay.paused) {
    backgroundMusicDisplay.play();
    toggleMusicButton.textContent = "Stop Music";
  } else {
    backgroundMusicDisplay.pause();
    toggleMusicButton.textContent = "Play Music";
  }
}

toggleMusicButton.addEventListener("click", toggleMusic);

const breakIdeas = {
  Physical: [
    "Stretch your neck and shoulders",
    "Do a few jumping jacks or squats",
    "Roll your wrists or ankles to relieve tension",
    "Stand and do a quick forward fold to touch your toes",
    "Shake out your arms and legs to release energy",
  ],
  Mental: [
    "Close your eyes and take deep breaths",
    "Try a 1-minute mindfulness meditation",
    "Visualize a calm or happy place",
    "Look at something distant to relax your eyes",
    "Recite an affirmation or a motivating thought",
  ],
  Sensory: [
    "Step to a window and look outside",
    "Drink a sip of water mindfully, savoring it",
    "Lightly massage your temples or hands.",
    "Rub your palms together and feel the warmth.",
  ],
  Productivity: [
    "Write down one thing you're grateful for",
    "Review your next task to mentally prepare",
    "Clear one small item off your desk",
    "Quickly organize and declutter something near you",
    "Jot down any distracting thoughts to address later",
  ],
};
const breakCategories = Object.keys(breakIdeas);

function showBreakIdeas() {
  let randomCategory =
    breakCategories[Math.floor(Math.random() * breakCategories.length)];

  let randomIdea =
    breakIdeas[randomCategory][
      Math.floor(Math.random() * breakIdeas[randomCategory].length)
    ];

  breakIdeasDisplay.textContent = `${randomCategory}: ${randomIdea}`;
}

function clearBreakIdeas() {
  breakIdeasDisplay.textContent = "";
}
