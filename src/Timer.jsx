import { useState, useEffect, useRef } from "react";
import BreakIdeas from "./BreakIdea";
import Affirmations from "./Affirmations";
import endChime from "../public/deathChime.mp3";

const Timer = () => {
  // during dev era
  const workDuration = 10 * 60;
  const breakDuration = 1 * 60;

  const endAudio = useRef(new Audio(endChime));

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

  const affirmations = [
    "What can I do in this session that can help me get closer to my goal",
    "If I don't know it, I ask for help",
    "I am allowed to do Anki in class",
    "I am allowed to read books in class",
    "I am allowed to study Qazaq in class",
    "I am independent",
    "I am willing to walk away from anything",
    "Seeking the best is the problem",
    "I am intentional",
    "I am content with what I have",
    "I have no regrets",
    "I know I cannot get everything in life",
    "I seek only my approval",
    "I know my worth",
    "I am kind to myself",
    "I improve daily",
    "I maintain balance",
    "I enjoy the journey",
    "I complete my Anki cards",
    "I act without permission",
    "Asking for forgiveness is easier",
    "I am proactive",
    "I make plans",
    "I invite people",
    "I build friendships",
    "I build memories",
    "I play tennis",
    "I train in the gym",
    "I sit straight as if a string pulls my head up",
    "I embrace hard work",
    "I will take my mom to Hajj",
    "I work for a better future for my family",
  ];
  const getRandomAffirmations = () => {
    const shuffledAffirmations = [...affirmations].sort(
      () => 0.5 - Math.random()
    );
    return shuffledAffirmations.slice(0, 3);
  };

  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [breakIdea, setBreakIdea] = useState("");
  const [selectedAffirmations, setSelectedAffirmations] = useState(
    getRandomAffirmations()
  );

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

              endAudio.current.play();
              return breakDuration;
            } else {
              setIsWork(true);

              setBreakIdea("");

              setSelectedAffirmations(getRandomAffirmations());

              endAudio.current.play();
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
    setSelectedAffirmations(getRandomAffirmations());
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mt-2 text-m">EU BI ESH</div>
      {/* timer display */}
      <div className="mt-2 text-xl">{isWork ? "Work Time" : "Break Time"}</div>
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

      {/* break ideas & affirmations*/}
      {!isWork ? (
        <BreakIdeas idea={breakIdea} />
      ) : (
        <Affirmations affirmations={selectedAffirmations} />
      )}
      {/* break ideas & affirmations*/}
    </div>
  );
};

export default Timer;
