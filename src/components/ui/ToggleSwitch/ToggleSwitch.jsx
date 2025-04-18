import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ leftIcon, rightIcon, isActive, onToggle }) => {
  return (
    <div className="toggle-wrapper">
      <FontAwesomeIcon icon={leftIcon} className="toggle-side-icon" />
      <div
        className={`toggle-container ${isActive ? "active" : ""}`}
        onClick={onToggle}
      >
        <div className="toggle-circle"></div>
      </div>
      <FontAwesomeIcon icon={rightIcon} className="toggle-side-icon" />
    </div>
  );
};

export default ToggleSwitch;
