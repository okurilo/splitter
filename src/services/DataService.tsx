import { Expense, Project } from "../types";
interface DataServiceInterface {
  getProjects(): Project[];
  addProject(project: Project): void;
  addExpenseToProject(projectName: string, expense: Expense): void;
  setCurrentProject(projectName: string): void;
  getCurrentProject(): Project | undefined;
  deleteProject(projectName: string): void;
  updateProject(projectName: string, updatedProjectData: Project): void;
}

class DataService implements DataServiceInterface {
  updateProject(projectName: string, updatedProjectData: Project): void {
    throw new Error("Method not implemented.");
  }
  getProjects(): Project[] {
    throw new Error("Method not implemented.");
  }
  addProject(project: Project): void {
    throw new Error("Method not implemented.");
  }
  addExpenseToProject(projectName: string, expense: Expense): void {
    throw new Error("Method not implemented.");
  }
  setCurrentProject(projectName: string): void {
    throw new Error("Method not implemented.");
  }
  getCurrentProject(): Project | undefined {
    throw new Error("Method not implemented.");
  }
  deleteProject(projectName: string): void {
    throw new Error("Method not implemented.");
  }
  static getProjects(): Project[] {
    return JSON.parse(localStorage.getItem("projects") || "[]");
  }

  static addProject(project: Project): void {
    const projects = DataService.getProjects();
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static addExpenseToProject(projectName: string, expense: Expense): void {
    const projects = DataService.getProjects();
    const projectIndex = projects.findIndex(
      (p) => p.projectName === projectName
    );
    if (projectIndex !== -1) {
      projects[projectIndex].expenses = projects[projectIndex].expenses || [];
      projects[projectIndex].expenses.push(expense);
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }

  static setCurrentProject(projectName: string): void {
    localStorage.setItem("currentProject", projectName);
  }

  static getCurrentProject(): Project | undefined {
    const projectName = localStorage.getItem("currentProject");
    return DataService.getProjects().find((p) => p.projectName === projectName);
  }

  static deleteProject(projectName: string): void {
    const projects = DataService.getProjects().filter(
      (project: Project) => project.projectName !== projectName
    );
    localStorage.setItem("projects", JSON.stringify(projects));
    if (localStorage.getItem("currentProject") === projectName) {
      localStorage.removeItem("currentProject");
    }
  }

  static updateProject(projectName: string, updatedProjectData: Project): void {
    const projects = DataService.getProjects();
    const projectIndex = projects.findIndex(
      (project) => project.projectName === projectName
    );
    if (projectIndex !== -1) {
      // Обновляем данные проекта, сохраняя идентификатор и обновляя остальные данные
      projects[projectIndex] = {
        ...projects[projectIndex],
        ...updatedProjectData,
      };
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }
}

export default DataService;
