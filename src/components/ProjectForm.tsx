import React, { useState } from "react";
import { Participants, Project } from "../types";

interface ProjectFormProps {
  onCreateProject: (project: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onCreateProject }) => {
  const [projectName, setProjectName] = useState<string>("");
  const [participants, setParticipants] = useState<Participants>([""]);

  const handleRemoveParticipant = (index: number) => {
    const newParticipants = [...participants];
    newParticipants.splice(index, 1);
    setParticipants(newParticipants);
  };

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
        placeholder="Название проекта"
        required
      />
      {participants.map((participant, index) => (
        <div key={index} style={{ display: "flex" }}>
          <input
            type="text"
            value={participant}
            onChange={(e) => {
              const newParticipants = [...participants];
              newParticipants[index] = e.target.value;
              setParticipants(newParticipants);
            }}
            placeholder="Имя участника"
            required
          />
          <button type="button" onClick={() => handleRemoveParticipant(index)}>
            Удалить
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setParticipants([...participants, ""])}
      >
        Добавить участника
      </button>
      <button type="submit">Создать проект</button>
    </form>
  );
};

export default ProjectForm;
