import React from "react";
import "./SwipeGameApp.css";

const SwipeDisplay = ({ direction, feedback }) => {
  return (
    <div
      className={`swipe-direction ${feedback || ""} ${
        feedback === "wrong" ? "shake" : ""
      }`}
      key={`${direction}-${feedback}`}
    >
      {direction.toUpperCase()}
    </div>
  );
};

export default SwipeDisplay;
