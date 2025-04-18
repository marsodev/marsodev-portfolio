import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ leftIcon, rightIcon, isActive, onToggle }) => {
  const [internalActive, setInternalActive] = useState(isActive);

  useEffect(() => {
    setInternalActive(isActive);
  }, [isActive]);

  const handleClick = () => {
    setInternalActive((prev) => !prev);
    onToggle();
  };

  return (
    <div className="toggle-wrapper">
      <FontAwesomeIcon icon={leftIcon} className="toggle-side-icon" />
      <div
        className={`toggle-container ${internalActive ? "active" : ""}`}
        onClick={handleClick}
      >
        <div className="toggle-circle"></div>
      </div>
      <FontAwesomeIcon icon={rightIcon} className="toggle-side-icon" />
    </div>
  );
};

export default ToggleSwitch;
