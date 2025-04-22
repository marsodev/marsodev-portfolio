import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SkillItem = ({ skill }) => {
  return (
    <div className="skill-item">
      <div className="skill-icon">
        <FontAwesomeIcon icon={skill.icon} size="2x" />
        <span>{skill.name}</span>
      </div>
      <div className="skill-level">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`level-bar ${i < skill.level ? "filled" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SkillItem;
