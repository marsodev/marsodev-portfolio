import React from "react";
import "./ContributionGrid.css";

const generateFakeData = () => {
  const weeks = 20;
  const days = 7;
  const grid = [];

  for (let i = 0; i < weeks; i++) {
    const week = [];
    for (let j = 0; j < days; j++) {
      week.push(Math.floor(Math.random() * 5));
    }
    grid.push(week);
  }

  return grid;
};

const ContributionGrid = () => {
  const data = generateFakeData();

  return (
    <div className="contribution-grid">
      {data.map((week, wIdx) => (
        <div className="week-column" key={wIdx}>
          {week.map((dayLevel, dIdx) => (
            <div key={dIdx} className={`day-square level-${dayLevel}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ContributionGrid;
