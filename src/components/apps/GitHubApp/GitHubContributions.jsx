import React from "react";

const GitHubContributions = ({ contributions }) => {
  const getLevel = (count) => {
    if (count >= 20) return 4;
    if (count >= 10) return 3;
    if (count >= 5) return 2;
    if (count >= 1) return 1;
    return 0;
  };

  return (
    <div className="contribution-section">
      <h3>Last 30 Days Contributions</h3>
      <div className="contribution-grid">
        {contributions.map((day, index) => (
          <div
            key={index}
            className={`day-square level-${getLevel(day.contributionCount)}`}
            title={`${day.date}: ${day.contributionCount} contribution${
              day.contributionCount !== 1 ? "s" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default GitHubContributions;
