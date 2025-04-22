import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconMap } from "./iconMap";

const ProjectCard = ({ project }) => {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <img src={project.image} alt={project.title} className="project-image" />
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
  );
};

export default ProjectCard;
