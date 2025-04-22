import React from "react";
import {
  faArrowLeft,
  faMoon,
  faSun,
  faVolumeUp,
  faVolumeMute,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";
import SettingsOption from "./SettingsOption";

import "./SettingsApp.css";

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
        <SettingsOption
          label="Theme"
          leftIcon={faSun}
          rightIcon={faMoon}
          isActive={isDark}
          onToggle={toggleTheme}
        />
        <SettingsOption
          label="Sound"
          leftIcon={faVolumeMute}
          rightIcon={faVolumeUp}
          isActive={isSoundOn}
          onToggle={toggleSound}
        />
        <SettingsOption
          label="Animations"
          leftIcon={faPause}
          rightIcon={faPlay}
          isActive={!isAnimationPaused}
          onToggle={toggleAnimation}
        />
      </div>
    </div>
  );
};

export default SettingsApp;
