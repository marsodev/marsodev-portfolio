import React from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import projet1 from "../../../assets/images/projet1.png";
import IconButton from "../../ui/IconButton/IconButton";
import "./ProjectsApp.css";

const projects = [
  {
    title: "Test 1",
    description: "Petit projet de test n°1",
    link: "#",
    image: projet1,
    techs: ["faReact", "faJs", "faCss3Alt"],
  },
  {
    title: "Test 1",
    description: "Petit projet de test n°1",
    link: "#",
    image: projet1,
    techs: ["faReact", "faJs", "faCss3Alt"],
  },
  {
    title: "Test 1",
    description: "Petit projet de test n°1",
    link: "#",
    image: projet1,
    techs: ["faReact", "faJs", "faCss3Alt"],
  },
];

import {
  faReact,
  faJs,
  faCss3Alt,
  faHtml5,
  faNodeJs,
  faPython,
} from "@fortawesome/free-brands-svg-icons";

const iconMap = {
  faReact,
  faJs,
  faCss3Alt,
  faHtml5,
  faNodeJs,
  faPython,
};

const ProjectsApp = ({ onBackHome }) => {
  return (
    <div className="projects-app">
      <div className="projects-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>Projects</h2>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
          >
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
            />
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-techs">
                {project.techs.map((tech, idx) => (
                  <FontAwesomeIcon
                    key={idx}
                    icon={iconMap[tech]}
                    className="tech-icon"
                  />
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsApp;
