import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AppIcon = ({ app, onClick }) => {
  return (
    <div className="app-wrapper" onClick={onClick}>
      <div className="app-icon">
        <FontAwesomeIcon icon={app.icon} className="app-logo" />
      </div>
      <span className="app-name">{app.name}</span>
    </div>
  );
};

export default AppIcon;
