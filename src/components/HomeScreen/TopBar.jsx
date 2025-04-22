import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBatteryThreeQuarters,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "../ui/IconButton/IconButton";

const TopBar = ({ time, onBackToLanding }) => {
  return (
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
  );
};

export default TopBar;
