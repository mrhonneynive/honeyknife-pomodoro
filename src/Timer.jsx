import { useState, useEffect } from "react";

const Timer = () => {
  const workDuration = 10 * 6;
  const breakDuration = 1 * 6;

  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((previousTime) => {
          if (previousTime > 0) {
            return previousTime - 1;
          } else {
            setIsRunning(false);
            setIsWork(!isWork);
            if (isWork) {
              return workDuration;
            } else {
              return breakDuration;
            }
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTimeLeft(workDuration);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="text-4xl font-mono">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={pauseTimer}
        >
          Stop
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
          onClick={resetTimer}
        >
          Pause
        </button>
      </div>
    </div>
  );
};

export default Timer;
