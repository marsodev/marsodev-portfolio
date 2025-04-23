import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const SlideButton = ({ offsetX, onStart, buttonRef }) => {
  return (
    <div
      className="slide-button"
      ref={buttonRef}
      style={{ transform: `translateX(${offsetX}px)` }}
      onMouseDown={onStart}
      onTouchStart={onStart}
    >
      <FontAwesomeIcon icon={faArrowRightLong} />
    </div>
  );
};

export default SlideButton;
