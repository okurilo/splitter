import React, { useState } from "react";
import { Participants, Project } from "../types";

interface ProjectFormProps {
  onCreateProject: (project: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onCreateProject }) => {
  const [projectName, setProjectName] = useState<string>("");
  const [participants, setParticipants] = useState<Participants>([""]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateProject({ projectName, participants, expenses: [] });
    setProjectName("");
    setParticipants([""]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Project Name"
        required
      />
      {participants.map((participant, index) => (
        <input
          key={index}
          type="text"
          value={participant}
          onChange={(e) => {
            const newParticipants = [...participants];
            newParticipants[index] = e.target.value;
            setParticipants(newParticipants);
          }}
          placeholder="Participant Name"
          required
        />
      ))}
      <button
        type="button"
        onClick={() => setParticipants([...participants, ""])}
      >
        Add Participant
      </button>
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm;
