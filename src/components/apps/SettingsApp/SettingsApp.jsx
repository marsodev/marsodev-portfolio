import React from "react";
import "./SettingsApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faArrowLeft,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";

const SettingsApp = ({
  isDark,
  toggleTheme,
  isSoundOn,
  toggleSound,
  onBackHome,
}) => {
  return (
    <div className="settings-app">
      <div className="settings-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>Settings</h2>
      </div>

      <div className="settings-content">
        <div className="settings-option">
          <span>Theme</span>
          <button className="option-button" onClick={toggleTheme}>
            <FontAwesomeIcon
              icon={isDark ? faSun : faMoon}
              className="option-icon"
            />
            <span>
              {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </span>
          </button>
        </div>

        <div className="settings-option">
          <span>Sound</span>
          <button className="option-button" onClick={toggleSound}>
            <FontAwesomeIcon
              icon={isSoundOn ? faVolumeUp : faVolumeMute}
              className="option-icon"
            />
            <span>{isSoundOn ? "Sound ON" : "Sound OFF"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
