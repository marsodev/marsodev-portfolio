import React from "react";
import "./SettingsApp.css";
import {
  faMoon,
  faSun,
  faVolumeUp,
  faVolumeMute,
  faArrowLeft,
  faPause, // On ajoute une icône pour l'animation
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";
import ToggleSwitch from "../../ui/ToggleSwitch/ToggleSwitch";

const SettingsApp = ({
  isDark,
  toggleTheme,
  isSoundOn,
  toggleSound,
  isAnimationPaused,
  toggleAnimation,
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
          <div className="settings-label">Theme</div>
          <ToggleSwitch
            leftIcon={faSun}
            rightIcon={faMoon}
            isActive={isDark}
            onToggle={toggleTheme}
          />
        </div>

        <div className="settings-option">
          <div className="settings-label">Sound</div>
          <ToggleSwitch
            leftIcon={faVolumeMute}
            rightIcon={faVolumeUp}
            isActive={isSoundOn}
            onToggle={toggleSound}
          />
        </div>

        <div className="settings-option">
          <div className="settings-label">Animations</div>
          <ToggleSwitch
            leftIcon={faPause}
            rightIcon={faPlay}
            isActive={!isAnimationPaused}
            onToggle={toggleAnimation}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
