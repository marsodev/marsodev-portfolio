import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBatteryThreeQuarters,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../ui/IconButton/IconButton";

const HomeScreen = ({ apps, onOpenApp, isDark, onBackToLanding }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-screen">
      <div className="top-bar">
        <div className="top-left">
          <IconButton icon={faArrowLeft} onClick={onBackToLanding} />
        </div>

        <div className="top-center">
          <span className="system-name">marsOS v1.0</span>
        </div>

        <div className="top-right">
          <FontAwesomeIcon
            icon={faBatteryThreeQuarters}
            className="battery-icon"
          />
          <div className="time-text">{time}</div>
        </div>
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
