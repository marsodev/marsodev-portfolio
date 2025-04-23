import React from "react";

const SlideText = ({ lettersRef, clearedLetters }) => {
  const text = "Swipe to unlock";
  return (
    <div className="slide-text">
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => (lettersRef.current[i] = el)}
          className="slide-letter"
          style={{ opacity: clearedLetters.current.has(i) ? 0 : 1 }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default SlideText;
