import React, { useState, useEffect } from "react";
import ProjectForm from "./components/ProjectForm";
import ExpensesForm from "./components/ExpensesForm";
import ExpensesTable from "./components/ExpensesTable";
import DebtsCalculator from "./components/DebtsCalculator";
import DebtsTable from "./components/DebtsTable"; // Импортируем DebtsTable
import Header from "./components/Header";
import DataService from "./services/DataService";
import "./styles/app.css";
import { Expense, Project } from "./types";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const currentProjectName = currentProject ? currentProject.projectName : "";

  useEffect(() => {
    const loadedProjects = DataService.getProjects();
    setProjects(loadedProjects);
    if (loadedProjects.length > 0) {
      setCurrentProject(loadedProjects[0]);
    }
  }, []);

  const handleCreateProject = (project: Project) => {
    DataService.addProject(project);
    setProjects([...projects, project]);
    setCurrentProject(project);
  };

  const handleSelectProject = (projectName: string) => {
    const selectedProject = projects.find((p) => p.projectName === projectName);
    if (selectedProject) {
      setCurrentProject(selectedProject);
    } else {
      setCurrentProject(null);
    }
  };

  const handleAddExpense = (expense: Expense) => {
    if (currentProject) {
      const { title, participants, payer, amount } = expense;
      const newExpense = {
        title,
        amount: amount || 0,
        payer: payer || "",
        participants,
      };

      DataService.addExpenseToProject(currentProject.projectName, newExpense);
      setCurrentProject((prevProject) => {
        if (prevProject) {
          const updatedExpenses = [...prevProject.expenses, newExpense];
          return {
            ...prevProject,
            expenses: updatedExpenses,
          };
        }
        return prevProject;
      });
    }
  };

  const handleDeleteExpense = (expenseIndex: number) => {
    if (currentProject) {
      // Удаление расхода из списка, используя индекс
      const updatedExpenses = currentProject.expenses.filter(
        (_, index) => index !== expenseIndex
      );

      // Обновление текущего проекта с новым списком расходов
      setCurrentProject((prevProject) => {
        if (prevProject) {
          return {
            ...prevProject,
            expenses: updatedExpenses,
          };
        }
        return prevProject;
      });

      // Дополнительно, можно вызвать метод сервиса для обновления данных на сервере или в локальном хранилище
      DataService.updateProject(currentProject.projectName, {
        ...currentProject,
        expenses: updatedExpenses,
      });
    }
  };

  return (
    <div className="App">
      <Header
        currentProjectName={currentProjectName}
        projects={projects}
        onSelectProject={handleSelectProject}
        onAddProject={() => setCurrentProject(null)}
        onDeleteProject={DataService.deleteProject}
      />
      {!currentProject ? (
        <ProjectForm onCreateProject={handleCreateProject} />
      ) : (
        <>
          <ExpensesForm
            onAddExpense={handleAddExpense}
            currentProject={currentProject}
          />
          <ExpensesTable
            expenses={currentProject.expenses}
            handleDeleteExpense={handleDeleteExpense}
          />
          <DebtsCalculator
            expenses={currentProject.expenses}
            participants={currentProject.participants}
          />
          <DebtsTable // Добавляем DebtsTable
            expenses={currentProject.expenses}
            participants={currentProject.participants}
          />
        </>
      )}
    </div>
  );
}

export default App;
