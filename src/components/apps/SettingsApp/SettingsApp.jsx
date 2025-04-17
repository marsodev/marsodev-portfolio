import React from "react";
import "./SettingsApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";

const SettingsApp = ({ isDark, toggleTheme, onBackHome }) => {
  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div className="settings-app">
      <div className="settings-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>Settings</h2>
      </div>

      <div className="settings-content">
        <div className="theme-toggle">
          <span>Theme</span>
          <button className="theme-button" onClick={handleToggle}>
            <FontAwesomeIcon
              icon={isDark ? faSun : faMoon}
              className="theme-icon"
            />
            <span>
              {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
