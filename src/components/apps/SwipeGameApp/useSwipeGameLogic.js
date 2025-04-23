import { useState, useEffect, useRef } from "react";

const directions = ["up", "down", "left", "right"];

const getRandomDirection = (exclude) => {
  let newDirection;
  do {
    newDirection = directions[Math.floor(Math.random() * directions.length)];
  } while (newDirection === exclude);
  return newDirection;
};

const keyMap = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

export const useSwipeGameLogic = () => {
  const [currentDirection, setCurrentDirection] = useState(
    getRandomDirection()
  );
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(2000);
  const [feedback, setFeedback] = useState(null);
  const timerRef = useRef(null);

  const changeDirection = (prevDirection) => {
    const newDir = getRandomDirection(prevDirection);
    setCurrentDirection(newDir);
  };

  const failAttempt = () => {
    setFeedback("wrong");
    setTimeout(() => setFeedback(null), 300);
    setScore(0);
    setSpeed(2000);
    changeDirection(currentDirection);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      failAttempt();
    }, speed);
    return () => clearTimeout(timerRef.current);
  }, [currentDirection, speed]);

  useEffect(() => {
    const handleKey = (e) => {
      const dir = keyMap[e.key];
      if (dir) handleSwipe(dir);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentDirection]);

  const handleSwipe = (dir) => {
    if (dir === currentDirection) {
      setFeedback("correct");
      setScore((prev) => prev + 1);
      setSpeed((prev) => Math.max(700, prev - 100));
    } else {
      failAttempt();
    }
    clearTimeout(timerRef.current);
    changeDirection(currentDirection);
  };

  return {
    currentDirection,
    score,
    feedback,
    handleSwipe,
  };
};
