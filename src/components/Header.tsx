import React from "react";
import { Project } from "../types";
import DataService from "../services/DataService";

type HeaderProps = {
  currentProjectName: string;
  projects: Project[];
  onSelectProject: (projectName: string) => void;
  onAddProject: () => void;
  onDeleteProject: DataService["deleteProject"];
};

function Header({
  currentProjectName,
  projects,
  onSelectProject,
  onAddProject,
  onDeleteProject,
}: HeaderProps) {
  const handleDeleteProject = () => {
    onDeleteProject(currentProjectName);
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <h1>Split Bill App</h1>
      <div>
        <select
          onChange={(e) => onSelectProject(e.target.value)}
          value={currentProjectName}
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.projectName} value={project.projectName}>
              {project.projectName}
            </option>
          ))}
        </select>
        <button onClick={onAddProject}>New Project</button>
        <button onClick={handleDeleteProject} disabled={!currentProjectName}>
          Delete Project
        </button>
      </div>
    </header>
  );
}

export default Header;
