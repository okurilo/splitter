import React from "react";
import { Project } from "../../types";
import DataService from "../../services/DataService";
import "./style.css";

type HeaderProps = {
  currentProjectName: string;
  projects: Project[];
  onSelectProject: (projectName: string) => void;
  onAddProject: () => void;
  onDeleteProject: DataService["deleteProject"];
};

export const Header = ({
  currentProjectName,
  projects,
  onSelectProject,
  onAddProject,
  onDeleteProject,
}: HeaderProps) => {
  const handleDeleteProject = () => {
    onDeleteProject(currentProjectName);
  };

  return (
    <header className="header">
      <h1>Split Bill App</h1>
      <div>
        <select
          onChange={(e) => onSelectProject(e.target.value)}
          value={currentProjectName}
        >
          <option value=""></option>
          {projects.map((project) => (
            <option key={project.projectName} value={project.projectName}>
              {project.projectName}
            </option>
          ))}
        </select>
        <button onClick={onAddProject}>Новый проект</button>
        <button onClick={handleDeleteProject} disabled={!currentProjectName}>
          Удалить проект
        </button>
      </div>
    </header>
  );
};
