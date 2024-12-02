import { useState, useEffect } from "react";
import BreakIdeas from "./BreakIdea";

const Timer = () => {
  const workDuration = 1 * 6;
  const breakDuration = 1 * 6;

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

  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [breakIdea, setBreakIdea] = useState("");

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((previousTime) => {
          if (previousTime > 0) {
            return previousTime - 1;
          } else {
            setIsRunning(false);

            if (isWork) {
              setIsWork(false);

              const randomCategory =
                breakCategories[
                  Math.floor(Math.random() * breakCategories.length)
                ];
              const ideas = breakIdeas[randomCategory];
              const randomIdea =
                ideas[Math.floor(Math.random() * ideas.length)];
              setBreakIdea(`${randomCategory}: ${randomIdea}`);
              return breakDuration;
            } else {
              setIsWork(true);

              setBreakIdea("");
              return workDuration;
            }
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isWork]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(workDuration);
    setIsWork(true);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center p-4">
      {/* timer display */}
      <div className="text-4xl font-mono">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      {/* timer display */}

      {/* buttons */}
      <div className="mt-4">
        <button
          className={`${
            isRunning ? "bg-red-500" : "bg-blue-500"
          } text-white px-4 py-2 rounded mr-2`}
          onClick={toggleTimer}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      {/* buttons */}

      {/* break ideas */}
      {!isWork ? <BreakIdeas idea={breakIdea} /> : null}
      {/* break ideas */}
    </div>
  );
};

export default Timer;
