import React from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faHtml5,
  faCss3Alt,
  faJsSquare,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SkillsApp.css";

const skills = [
  { name: "HTML5", icon: faHtml5, level: 5 },
  { name: "CSS3", icon: faCss3Alt, level: 5 },
  { name: "JavaScript", icon: faJsSquare, level: 4 },
  { name: "React", icon: faReact, level: 3 },
];

const SkillsApp = ({ onBackHome }) => {
  return (
    <div className="skills-app">
      <div className="skills-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>Skills</h2>
      </div>

      <div className="skills-content">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
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
        ))}
      </div>
    </div>
  );
};

export default SkillsApp;
