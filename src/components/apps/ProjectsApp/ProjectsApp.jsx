import React from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";
import "./ProjectsApp.css";

const projects = [
  {
    title: "Test",
    description: "Test",
    link: "#",
  },
  {
    title: "Test",
    description: "Test",
    link: "#",
  },
  {
    title: "Test",
    description: "Test",
    link: "#",
  },
];

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
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsApp;
