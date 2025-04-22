import React from "react";
import ToggleSwitch from "../../ui/ToggleSwitch/ToggleSwitch";

const SettingsOption = ({ label, leftIcon, rightIcon, isActive, onToggle }) => {
  return (
    <div className="settings-option">
      <div className="settings-label">{label}</div>
      <ToggleSwitch
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        isActive={isActive}
        onToggle={onToggle}
      />
    </div>
  );
};

export default SettingsOption;
