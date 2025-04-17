import React from "react";
import "./AppIcon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AppIcon = ({ name, icon, onClick }) => {
  return (
    <div className="app-icon-wrapper" onClick={onClick}>
      <div className="app-icon-box">
        <FontAwesomeIcon icon={icon} className="app-icon-logo" />
      </div>
      <span className="app-icon-name">{name}</span>
    </div>
  );
};

export default AppIcon;
