import React, { useRef } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";
import SwipeDisplay from "./SwipeDisplay";
import { useSwipeGameLogic } from "./useSwipeGameLogic";
import "./SwipeGameApp.css";

const SwipeGameApp = ({ onBackHome }) => {
  const { currentDirection, score, feedback, handleSwipe } =
    useSwipeGameLogic();
  const touchStartRef = useRef({ x: 0, y: 0 });

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (Math.max(absX, absY) < 30) return;

    let dir = "";
    if (absX > absY) {
      dir = dx > 0 ? "right" : "left";
    } else {
      dir = dy > 0 ? "down" : "up";
    }
    handleSwipe(dir);
  };

  return (
    <div
      className="swipe-game-app"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="swipe-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>Swipe Game</h2>
      </div>

      <div className="swipe-score">Score: {score}</div>

      <div className="swipe-content">
        <SwipeDisplay direction={currentDirection} feedback={feedback} />
      </div>

      <div className="swipe-footer">
        Swipe in the direction (Mobile) or use arrow keys (PC)
      </div>
    </div>
  );
};

export default SwipeGameApp;
