import React, { useState, useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../ui/IconButton/IconButton";

import { projects } from "./projectsData";
import { iconMap } from "./iconMap";
import ProjectCard from "./ProjectCard";
import LoadingScreen from "./LoadingScreen";

import "./ProjectsApp.css";

const ProjectsApp = ({ onBackHome }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="projects-app">
      <div className="projects-header">
        <IconButton icon={faArrowLeft} onClick={onBackHome} />
        <h2>Projects</h2>
      </div>

      <div className="projects-list">
        {isLoading ? (
          <LoadingScreen text="Loading projects..." />
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsApp;
