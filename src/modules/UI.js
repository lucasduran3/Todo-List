import { toDate, isToday, isThisWeek } from "date-fns";
import TodoList from "./TodoList";
import Project from "./Project";
import Task from "./Task";

export default class UI {
  #defaultProjectContainer;
  #projectContainer;
  #newProjectForm;
  #newProjectInput;
  #projectDisplayContainer;
  #projectTitleElement;
  #projectCountElement;
  #tasksContainer;
  #taskTemplate;
  #newTaskForm;
  #newTaskNameInput;
  #newTaskPriorityInput;
  #newTaskDueDateInput;
  #clearCompleteTasksButton;
  #dialogTaskCreator;
  #dialogTaskModifier;
  #closeTaskCreatorButton;
  #openTaskCreatorButton;
  #closeTaskModifierButton;
  #modifierTaskForm;
  #modifiedTaskNameInput;
  #modifiedTaskPriorityInput;
  #modifiedTaskDueDateInput;
  #priorityValue;

  #todoList;

  constructor() {
    this.initializeDomElements();
    this.#todoList = new TodoList();
  }

  initializeDomElements() {
    this.#defaultProjectContainer = document.querySelector(
      "[data-default-project]"
    );
    this.#projectContainer = document.querySelector("[data-project]");
    this.#newProjectForm = document.querySelector("[data-new-project-form]");
    this.#newProjectInput = document.querySelector("[data-new-project-input]");
    this.#projectDisplayContainer = document.querySelector(
      "[data-project-display-container]"
    );
    this.#projectTitleElement = document.querySelector("[data-project-title]");
    this.#projectCountElement = document.querySelector("[data-project-count]");
    this.#tasksContainer = document.querySelector("[data-tasks]");
    this.#taskTemplate = document.getElementById("task-template");
    this.#newTaskForm = document.querySelector("[data-new-task-form]");
    this.#newTaskNameInput = document.querySelector("[data-new-task-input]");
    this.#newTaskPriorityInput = document.querySelector(
      "input[name='priority']"
    );
    this.#newTaskDueDateInput = document.querySelector(
      "[data-new-task-due-date]"
    );
    this.#clearCompleteTasksButton = document.querySelector(
      "[data-clear-complete-tasks-button]"
    );
    this.#dialogTaskCreator = document.querySelector(".todo-body");
    this.#dialogTaskModifier = document.querySelector(".modifier-task");
    this.#openTaskCreatorButton = document.querySelector(
      ".open-task-creator-button"
    );
    this.#closeTaskCreatorButton = document.querySelector(
      ".btn-close-task-creator"
    );
    this.#closeTaskModifierButton = document.querySelector(
      "[data-close-task-modifier-button]"
    );
    this.#modifierTaskForm = document.querySelector(
      "[data-modifier-task-form]"
    );
    this.#modifiedTaskNameInput = document.querySelector(
      "[data-modifier-task-name]"
    );
    this.#modifiedTaskPriorityInput = document.querySelector(
      "[data-modifier-task-priority]"
    );
    this.#modifiedTaskDueDateInput = document.querySelector(
      "[data-modifier-task-due-date]"
    );
  }

  setupEventListeners() {
    this.#defaultProjectContainer.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() == "li") {
        this.#todoList.selectedProjectId = e.target.dataset.projectId;
        this.saveAndRender();
      }
    });

    this.#projectContainer.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "li") {
        this.#todoList.selectedProjectId = e.target.dataset.projectId;
        this.saveAndRender();
      }

      if (e.target.tagName.toLowerCase() === "button") {
        this.#todoList.deleteProject(e.target.parentNode.dataset.projectId);
        this.saveAndRender();
      }
    });

    this.#tasksContainer.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "input") {
        this.#todoList.selectedProject.selectedTaskId = e.target.id;
        const selectedTask = this.#todoList.selectedProject.selectedTask;
        selectedTask.complete = e.target.checked;
        this.save();
        this.renderTaskCount(this.#todoList.selectedProject);
      }
      if (e.target.classList.contains("edit-task-icon")) {
        this.#dialogTaskModifier.showModal();
        this.#todoList.selectedProject.selectedTaskId = e.target.dataset.taskId;
        this.#modifiedTaskNameInput.value =
          this.#todoList.selectedProject.selectedTask.name;
        this.#modifiedTaskDueDateInput.value =
          this.#todoList.selectedProject.selectedTask.dueDate;
      }

      if (e.target.classList.contains("delete-task-icon")) {
        this.#todoList.selectedProject.deleteTaskById(e.target.dataset.taskId);
        this.saveAndRender();
      }
    });

    this.#clearCompleteTasksButton.addEventListener("click", (e) => {
      this.#todoList.selectedProject.clearCompleteTasks();
      this.saveAndRender();
    });

    this.#newProjectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const projectName = this.#newProjectInput.value;
      if (projectName == null || projectName == "") return;
      const project = new Project(projectName);
      this.#newProjectInput.value = null;
      this.#todoList.addProject(project);
      this.saveAndRender();
    });

    this.#newTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskName = this.#newTaskNameInput.value;
      const taskPriority = document.querySelector(
        'input[name="priority"]:checked'
      ).value;
      const taskDueDate = this.#newTaskDueDateInput.value;
      if (taskName == null || taskName === "") return;
      const task = new Task(taskName, taskDueDate, taskPriority);
      this.#newTaskNameInput.value = null;
      this.#todoList.selectedProject.addTask(task);

      const formatDate = new Date(task.getDateFormatted());
      if (isToday(toDate(formatDate))) {
        this.#todoList.todayProject.addTask(task);
      }

      if (isThisWeek(toDate(formatDate))) {
        this.#todoList.weekProject.addTask(task);
      }
      this.#dialogTaskCreator.close();
      this.saveAndRender();
    });

    this.#openTaskCreatorButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.#dialogTaskCreator.showModal();
    });

    this.#closeTaskCreatorButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.#dialogTaskCreator.close();
    });

    this.#modifierTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskName = this.#modifiedTaskNameInput.value;
      const taskPriority = document.querySelector(
        'input[name="priority"]:checked'
      ).value;
      const taskDueDate = this.#modifiedTaskDueDateInput.value;
      if (taskName == null || taskName === "") return;
      const selectedTask = this.#todoList.selectedProject.selectedTask;
      selectedTask.name = taskName;
      selectedTask.priority = taskPriority;
      selectedTask.dueDate = taskDueDate;
      this.#dialogTaskModifier.close();
      this.saveAndRender();
    });

    this.#closeTaskModifierButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.#dialogTaskModifier.close();
    });
  }

  render() {
    this.clearElement(this.#projectContainer);
    this.clearElement(this.#defaultProjectContainer);
    this.renderLists();

    if (
      this.#todoList.selectedProjectId === "null" ||
      this.#todoList.selectedProjectId === null
    ) {
      this.#projectDisplayContainer.style.display = "none";
    } else {
      this.#projectDisplayContainer.style.display = "";
      this.#projectTitleElement.innerText = this.#todoList.selectedProject.name;
      this.renderTaskCount(this.#todoList.selectedProject);
      this.clearElement(this.#tasksContainer);
      this.renderTasks(this.#todoList.selectedProject);
    }
  }

  save() {
    const projectsToSave = [];

    this.#todoList.projects.forEach((project) => {
      const projectObject = {
        name: project.name,
        id: project.id,
        default: project.default,
        tasks: [],
      };
      project.tasks.forEach((task) => {
        const taskObject = {
          name: task.name,
          priority: task.priority,
          dueDate: task.dueDate,
          complete: task.complete,
          id: task.id,
        };
        projectObject.tasks.push(taskObject);
      });
      projectsToSave.push(projectObject);
    });

    localStorage.setItem("projects", JSON.stringify(projectsToSave));
    localStorage.setItem("selectedProjectId", this.#todoList.selectedProjectId);
  }

  saveAndRender() {
    this.save();
    this.render();
  }

  renderTasks(selectedProject) {
    selectedProject.tasks.forEach((task) => {
      const taskElement = document.importNode(this.#taskTemplate.content, true);
      const checkbox = taskElement.querySelector("input");
      const taskSpan = taskElement.querySelector(".task-info");
      const taskTitle = taskElement.querySelector(".title");
      const taskDueDate = taskElement.querySelector(".dueDate");
      const editIcon = taskElement.querySelector(".edit-task-icon");
      editIcon.dataset.taskId = task.id;
      const deleteIcon = taskElement.querySelector(".delete-task-icon");
      deleteIcon.dataset.taskId = task.id;
      const customCheckbox = taskElement.querySelector(".custom-checkbox");
      customCheckbox.style.borderColor = task.priority;
      checkbox.id = task.id;
      checkbox.checked = task.complete;
      taskTitle.innerText = task.name;
      taskDueDate.innerText = task.dueDate;
      const label = taskElement.querySelector("label");
      label.htmlFor = task.id;
      label.dataset.taskId = task.id;
      this.#tasksContainer.appendChild(taskElement);
    });
  }

  renderTaskCount(selectedProject) {
    const incompleteTasksCount = selectedProject.tasks.filter(
      (task) => !task.complete
    ).length;
    const taskString = incompleteTasksCount === 1 ? "task" : "tasks";
    this.#projectCountElement.innerText = `${incompleteTasksCount} ${taskString} remaining`;
  }

  renderLists() {
    this.#todoList.projects.forEach((project) => {
      if (!project.default) {
        const projectElement = document.createElement("li");
        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.innerHTML = "✖";
        deleteProjectButton.classList.add("delete-project-btn");
        deleteProjectButton.style.display = "none";
        projectElement.dataset.projectId = project.id;
        projectElement.classList.add("project-name");
        projectElement.innerText = project.name;
        projectElement.appendChild(deleteProjectButton);

        if (project.id === this.#todoList.selectedProjectId) {
          projectElement.classList.add("active-project");
          deleteProjectButton.style.display = "";
        }
        this.#projectContainer.appendChild(projectElement);
      } else {
        const defaultProjectElement = document.createElement("li");
        defaultProjectElement.dataset.projectId = project.id;
        defaultProjectElement.classList.add("project-name");
        defaultProjectElement.innerText = project.name;
        if (project.id === this.#todoList.selectedProjectId) {
          defaultProjectElement.classList.add("active-project");
        }
        this.#defaultProjectContainer.appendChild(defaultProjectElement);
      }
    });
  }

  clearElement(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  load() {
    if (localStorage.getItem("projects") == null) {
      this.#todoList.loadDefaultProjects();
    } else {
      const loadProjects = JSON.parse(localStorage.getItem("projects"));
      loadProjects.forEach((project) => {
        if (!project.default) {
          const loadedProject = new Project(project.name);
          loadedProject.id = project.id;
          loadedProject.default = false;
          project.tasks.forEach((task) => {
            const loadedTask = new Task(task.name, task.dueDate, task.priority);
            loadedTask.id = task.id;
            loadedTask.complete = task.complete;
            loadedProject.tasks.push(loadedTask);
          });
          this.#todoList.addProject(loadedProject);
        } else {
          switch (project.name) {
            case "Inbox":
              const loadedInbox = new Project("Inbox");
              loadedInbox.id = project.id;
              loadedInbox.default = true;
              project.tasks.forEach((task) => {
                const loadedTask = new Task(
                  task.name,
                  task.dueDate,
                  task.priority
                );
                loadedTask.id = task.id;
                loadedTask.complete = task.complete;
                loadedInbox.tasks.push(loadedTask);
              });
              this.#todoList.inboxProject = loadedInbox;
              this.#todoList.addProject(this.#todoList.inboxProject);
              break;

            case "Today":
              const loadedToday = new Project("Today");
              loadedToday.id = project.id;
              loadedToday.default = true;
              project.tasks.forEach((task) => {
                const loadedTask = new Task(
                  task.name,
                  task.dueDate,
                  task.priority
                );
                loadedTask.id = task.id;
                loadedTask.complete = task.complete;
                loadedToday.tasks.push(loadedTask);
              });
              this.#todoList.todayProject = loadedToday;
              this.#todoList.addProject(this.#todoList.todayProject);
              break;

            case "This week":
              const loadedWeek = new Project("This week");
              loadedWeek.id = project.id;
              loadedWeek.default = true;
              project.tasks.forEach((task) => {
                const loadedTask = new Task(
                  task.name,
                  task.dueDate,
                  task.priority
                );
                loadedTask.id = task.id;
                loadedTask.complete = task.complete;
                loadedWeek.tasks.push(loadedTask);
              });
              this.#todoList.weekProject = loadedWeek;
              this.#todoList.addProject(this.#todoList.weekProject);
              break;

            default:
              break;
          }
        }
        this.#todoList.selectedProjectId =
          localStorage.getItem("selectedProjectId");
      });
    }
  }

  init() {
    this.load();
    this.setupEventListeners();
    this.render();
  }
}
