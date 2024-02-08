import Project from "./Project";

export default class TodoList {
  #projects;
  #selectedProjectId;
  #inboxProject;
  #todayProject;
  #weekProject;
  #selectedProject;

  constructor() {
    this.#projects = [];
  }

  loadDefaultProjects() {
    const inboxExists = this.#projects.some((list) => list.name === "Inbox");
    const todayExists = this.#projects.some((list) => list.name === "Today");
    const weekExists = this.#projects.some((list) => list.name === "This week");

    if (!inboxExists) {
      this.#inboxProject = new Project("Inbox");
      this.#inboxProject.default = true;
      this.#projects.push(this.#inboxProject);
      this.#selectedProjectId = this.#inboxProject.id;
    }

    if (!todayExists) {
      this.#todayProject = new Project("Today");
      this.#todayProject.default = true;
      this.#todayProject.tasks = this.getTodayTasks();
      this.#projects.push(this.#todayProject);
    }

    if (!weekExists) {
      this.#weekProject = new Project("This week");
      this.#weekProject.default = true;
      this.#weekProject.tasks = this.getWeekTasks();
      this.#projects.push(this.#weekProject);
    }
  }

  getTodayTasks() {
    const todayTasks = [];
    this.#projects.forEach((project) => {
      project.tasks.forEach((task) => {
        const taskDate = new Date(getDateFormatted(task.dueDate));
        if (isToday(toDate(taskDate))) {
          todayTasks.push(task);
        }
      });
    });

    return todayTasks;
  }

  getWeekTasks() {
    const weekTasks = [];
    this.#projects.forEach((project) => {
      project.tasks.forEach((task) => {
        const taskDate = new Date(getDateFormatted(task.dueDate));
        if (isThisWeek(toDate(taskDate))) {
          weekTasks.push(task);
        }
      });
    });

    return weekTasks;
  }

  deleteProject(id) {
    this.#projects = this.#projects.filter((project) => project.id !== id);
    this.#selectedProjectId = null;
  }

  addProject(project) {
    this.#projects.push(project);
  }

  set projects(value) {
    this.#projects = value;
  }
  get projects() {
    return this.#projects;
  }

  set inboxProject(project) {
    this.#inboxProject = project;
  }
  get inboxProject() {
    return this.#inboxProject;
  }

  set todayProject(project) {
    this.#todayProject = project;
  }
  get todayProject() {
    return this.#todayProject;
  }

  set weekProject(project) {
    this.#weekProject = project;
  }
  get weekProject() {
    return this.#weekProject;
  }

  set selectedProjectId(value) {
    this.#selectedProjectId = value;
  }
  get selectedProjectId() {
    return this.#selectedProjectId;
  }

  get selectedProject() {
    return this.#projects.find(
      (project) => project.id === this.#selectedProjectId
    );
  }

  set selectedProject(value) {
    this.#selectedProject = value;
  }
}
