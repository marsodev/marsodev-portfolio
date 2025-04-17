import React from "react";
import "./HomeScreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../ui/IconButton/IconButton";

const HomeScreen = ({ apps, onOpenApp, isDark, onBackToLanding }) => {
  return (
    <div className="home-screen">
      <div className="top-bar">
        <IconButton icon={faArrowLeft} onClick={onBackToLanding} />
      </div>
      <div className="apps-grid">
        {apps.map((app, index) => (
          <div
            key={index}
            className="app-wrapper"
            onClick={() => onOpenApp(app)}
          >
            <div className="app-icon">
              <FontAwesomeIcon icon={app.icon} className="app-logo" />
            </div>
            <span className="app-name">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
