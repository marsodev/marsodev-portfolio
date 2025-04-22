import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CounterUnit = ({ value, label, icon }) => {
  return (
    <div className="counter-item">
      <div className="counter-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="counter-flip">
        <span className="counter-number">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="counter-label">{label}</span>
    </div>
  );
};

export default CounterUnit;
