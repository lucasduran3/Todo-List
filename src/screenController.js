import Project from "./project";
import Todo from "./todo";
import ProjectRepository from "./projectRepository";

export default class ScreenController {
  #projectsListSide;
  #addProjectBtn;
  #submitProjectBtn;
  #cancelProjectBtn;
  #projectCreator;
  #projectCreatorForm;
  #projectNameInput;
  #projectTitle;

  #addTodoBtn;
  #todoNameInput;
  #todoDesInput;
  #todoDueDateInput;
  #todoColorInput;
  #submitTaskBtn;
  #cancelTodoBtn;
  #todoContainer;
  #todoCreator;
  #todoCreatorForm;

  #selectedProject;
  #inboxProject;
  #projectRepository;

  constructor() {
    this.initializeElements();
    this.initializeDefaultProjects();
    this.updateScreen();
  }

  createTodoCard(name, description, dueDate, color) {
    if (name !== "" || name !== null || name !== undefined) {
      const card = new Todo(name);
      card.description = description;
      card.dueDate = dueDate;
      card.color = color;
      this.#selectedProject.todos = card;

      this.updateScreen();
    }
  }

  createProject(name) {
    const project = new Project(name);
    this.#projectRepository.addProject(project);

    this.updateScreen();
  }

  clickHandler() {
    this.#addTodoBtn.addEventListener("click", () => {
      this.changeVisibilityItem(this.#todoCreator);
      this.changeVisibilityItem(this.#addTodoBtn);
    });

    this.#submitTaskBtn.addEventListener("click", () => {
      if (this.#todoNameInput.value) {
        this.createTodoCard(
          this.#todoNameInput.value,
          this.#todoDesInput.value,
          this.#todoDueDateInput.value,
          this.#todoColorInput.value
        );
        this.updateScreen();
        this.clearInputs(this.#todoCreatorForm);

        this.changeVisibilityItem(this.#todoCreator);
        this.changeVisibilityItem(this.#addTodoBtn);
      }
    });

    this.#cancelTodoBtn.addEventListener("click", () => {
      this.changeVisibilityItem(this.#todoCreator);
      this.changeVisibilityItem(this.#addTodoBtn);
      this.clearInputs(this.#todoCreatorForm);
    });

    this.#addProjectBtn.addEventListener("click", () => {
      this.changeVisibilityItem(this.#addProjectBtn);
      this.changeVisibilityItem(this.#projectCreator);
    });

    this.#submitProjectBtn.addEventListener("click", () => {
      this.changeVisibilityItem(this.#addProjectBtn);
      this.changeVisibilityItem(this.#projectCreator);
      this.createProject(this.#projectNameInput.value);
      this.clearInputs(this.#projectCreatorForm);
    });

    this.#cancelProjectBtn.addEventListener("click", () => {
      this.changeVisibilityItem(this.#addProjectBtn);
      this.changeVisibilityItem(this.#projectCreator);
      this.clearInputs(this.#projectCreatorForm);
    });

    document.addEventListener("click", (e) => {
      this.selectProject(e);
    });

    document.addEventListener("click", (e) => {
      this.checkDoneTodo(e);
    });

    document.addEventListener("click", (e) => {
      this.deleteTodo(e);
    });

    document.addEventListener("click", (e) => {
      this.deleteProject(e);
    });
  }

  updateScreen() {
    this.#projectTitle.innerHTML = this.#selectedProject.title;

    this.#todoContainer.innerHTML = "";
    const todosProject = this.#selectedProject.todos;

    this.updateTodo(todosProject);
    this.updateProject(this.#projectRepository.projects);
  }

  changeVisibilityItem(node) {
    switch (node.className.includes("inactive")) {
      case false:
        node.classList.remove("active");
        node.classList.add("inactive");
        break;
      case true:
        node.classList.remove("inactive");
        node.classList.add("active");
        break;
      default:
        break;
    }
  }

  clearInputs(form) {
    form.reset();
  }

  selectProject(e) {
    if (
      e.target.classList.contains("projectCard") ||
      e.target.classList.contains("inbox")
    ) {
      this.#selectedProject =
        this.#projectRepository.projects[e.target.dataset.index];

      this.updateScreen();
    }
  }

  checkDoneTodo(e) {
    if (e.target.classList.contains("todo-check")) {
      const selectedTodo =
        this.#selectedProject.todos[e.target.parentNode.dataset.index];
      selectedTodo.isDone = e.target.checked;
    }
  }

  deleteTodo(e) {
    if (e.target.classList.contains("delete-todo")) {
      this.#selectedProject.deleteTodo(e.target.parentNode.dataset.index);

      this.updateScreen();
    }
  }

  deleteProject(e) {
    if (e.target.classList.contains("delete-project")) {
      this.#projectRepository.deleteProject(e.target.parentNode.dataset.index);
      this.#selectedProject = this.#projectRepository.getLastProject();

      this.updateScreen();
    }
  }

  updateTodo(project) {
    project.forEach((todo, index) => {
      const todoCard = document.createElement("div");
      todoCard.classList.add("todoCard");
      const column = document.createElement("div");
      column.classList.add("column");
      const titleCard = document.createElement("div");
      titleCard.classList.add("todo-title");
      const descriptionCard = document.createElement("div");
      descriptionCard.classList.add("todo-description");
      const checkTodo = document.createElement("input");
      checkTodo.type = "checkbox";
      checkTodo.name = "done";
      checkTodo.checked = todo.isDone;
      checkTodo.classList.add("todo-check");
      titleCard.innerHTML = todo.title;
      descriptionCard.innerHTML = todo.description;
      const dueDateTodo = document.createElement("div");
      dueDateTodo.classList.add("todo-dueDate");
      dueDateTodo.innerHTML = todo.dueDate;
      todoCard.appendChild(checkTodo);
      column.appendChild(titleCard);
      column.appendChild(descriptionCard);
      column.appendChild(dueDateTodo);
      todoCard.appendChild(column);
      const deleteTodo = document.createElement("div");
      deleteTodo.classList.add("delete-todo");
      deleteTodo.innerHTML = "✖";
      todoCard.appendChild(deleteTodo);
      todoCard.style.borderColor = todo.color;
      todoCard.dataset.index = index;
      this.#todoContainer.appendChild(todoCard);
    });
  }

  updateProject(project) {
    this.#projectsListSide.innerHTML = "";
    project.forEach((project, index) => {
      if (project.title !== "Inbox") {
        const projectCard = document.createElement("div");
        projectCard.innerHTML = project.title;
        projectCard.classList.add("projectCard");
        const deleteProject = document.createElement("div");
        deleteProject.classList.add("delete-project");
        deleteProject.innerHTML = "✖";
        projectCard.appendChild(deleteProject);
        projectCard.dataset.index = index;
        this.#projectsListSide.appendChild(projectCard);
      } else {
        const inboxCard = document.querySelector(".inbox");
        inboxCard.dataset.index = 0;
      }
    });
  }

  initializeElements() {
    this.#projectsListSide = document.querySelector(".projects-list");
    this.#addProjectBtn = document.querySelector(".add-project-btn");
    this.#submitProjectBtn = document.querySelector(".submit-project");
    this.#cancelProjectBtn = document.querySelector(".cancel-project");
    this.#projectCreator = document.querySelector(".project-creator");
    this.#projectCreatorForm = document.querySelector(
      ".project-creator > form"
    );
    this.#projectNameInput = document.querySelector("#project-name");
    this.#projectTitle = document.querySelector(".project-title");
    this.#addTodoBtn = document.querySelector(".add-todo-btn");
    this.#todoCreator = document.querySelector(".todo-creator");
    this.#todoCreatorForm = document.querySelector(".todo-creator > form");
    this.#todoNameInput = document.querySelector("#todo-name");
    this.#todoDesInput = document.querySelector("#description");
    this.#todoDueDateInput = document.querySelector("#due-date");
    this.#todoColorInput = document.querySelector("#color");
    this.#submitTaskBtn = document.querySelector(".submit-todo");
    this.#cancelTodoBtn = document.querySelector(".cancel-todo");
    this.#todoContainer = document.querySelector(".todo-container");
  }

  initializeDefaultProjects() {
    this.#inboxProject = new Project("Inbox");
    this.#selectedProject = this.#inboxProject;
    this.#projectRepository = new ProjectRepository();
    this.#projectRepository.addProject(this.#inboxProject);
  }

  init() {
    this.clickHandler();
  }
}
