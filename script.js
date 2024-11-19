const WORK_DURATION = 10 * 60;
const BREAK_DURATION = 1 * 60;
let timeLeft = WORK_DURATION;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minutesDisplay.textContent = minutes.toString().padStart(2, "0");
  secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

// timer functionality
let timer;
let isRunning = false;
let isWork = true;

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

        timeLeft = WORK_DURATION;
      } else {
        showBreakIdeas();

        if (backgroundMusicDisplay.play) {
          toggleMusic();
        }

        timeLeft = BREAK_DURATION;
      }
      updateTimerDisplay();
    }
  }, 1000);
}

const startButton = document.getElementById("start");
startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", toggleMusic);

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

const breakIdeasDisplay = document.getElementById("breakIdeas");
const breakIdeas = {
  Physical: [
    "Stretch neck, shoulders, wrists, ankles",
    "Walk briskly and use stairs",
    "Stand and do a quick forward fold to touch your toes",
    "Blow your nose",
  ],
  Mental: [
    "Get away from your desk and visualize success",
    "Get away from your desk, close your eyes and take deep breaths",
  ],
  Sensory: [
    "Step to a window and look at something distant",
    "Drink a sip of water mindfully, savoring it",
    "Stand up and massage your temples and nasal bridge",
  ],
  Productivity: [
    "Stand up and write down one thing you're grateful for",
    "Stand up and review your next task to mentally prepare",
    "Stand up, organize and declutter something near you",
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
