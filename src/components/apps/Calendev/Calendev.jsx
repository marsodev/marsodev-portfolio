import React, { useEffect, useState } from "react";
import {
  faArrowLeft,
  faCalendarAlt,
  faClock,
  faHourglassHalf,
  faComputer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../ui/IconButton/IconButton";
import CounterUnit from "./CounterUnit";
import "./Calendev.css";

const Calendev = ({ onBackHome }) => {
  const [timePassed, setTimePassed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date("2024-12-01T00:00:00");

    const updateCounter = () => {
      const now = new Date();
      const diffMs = now - startDate;

      if (diffMs >= 0) {
        const diffSec = Math.floor(diffMs / 1000);
        const seconds = diffSec % 60;
        const diffMin = Math.floor(diffSec / 60);
        const minutes = diffMin % 60;
        const diffHours = Math.floor(diffMin / 60);
        const hours = diffHours % 24;
        const diffDays = Math.floor(diffHours / 24);
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = (diffDays % 365) % 30;

        setTimePassed({ years, months, days, hours, minutes, seconds });
      }
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="devcounter-app">
      <div className="devcounter-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>Calendev</h2>
      </div>

      <div className="devcounter-content">
        <h3 className="counter-title">
          <FontAwesomeIcon icon={faComputer} className="title-icon" />
          Calendev
        </h3>
        <div className="counter-values">
          <CounterUnit
            value={timePassed.years}
            label="Years"
            icon={faCalendarAlt}
          />
          <CounterUnit
            value={timePassed.months}
            label="Months"
            icon={faCalendarAlt}
          />
          <CounterUnit
            value={timePassed.days}
            label="Days"
            icon={faCalendarAlt}
          />
          <CounterUnit value={timePassed.hours} label="Hours" icon={faClock} />
          <CounterUnit
            value={timePassed.minutes}
            label="Minutes"
            icon={faClock}
          />
          <CounterUnit
            value={timePassed.seconds}
            label="Seconds"
            icon={faHourglassHalf}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendev;
