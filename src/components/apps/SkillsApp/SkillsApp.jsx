import React from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";
import SkillItem from "./SkillItem";
import { skills } from "./skillsData";

import "./SkillsApp.css";

const SkillsApp = ({ onBackHome }) => {
  return (
    <div className="skills-app">
      <div className="skills-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>Skills</h2>
      </div>

      <div className="skills-content">
        {skills.map((skill, index) => (
          <SkillItem key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillsApp;
