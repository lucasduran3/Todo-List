/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "./src/modules/Project.js":
/*!********************************!*\
  !*** ./src/modules/Project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");


class Project {
  #id;
  #name;
  #default;
  #tasks;
  #selectedTask;
  #selectedTaskId;

  constructor(name) {
    this.#id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
    this.#name = name;
    this.#default = false;
    this.#tasks = [];
  }

  set id(value) {
    this.#id = value;
  }

  get id() {
    return this.#id;
  }

  set name(name) {
    this.#name = name;
  }
  get name() {
    return this.#name;
  }

  set default(value) {
    this.#default = value;
  }
  get default() {
    return this.#default;
  }

  set tasks(tasks) {
    this.#tasks = tasks;
  }
  get tasks() {
    return this.#tasks;
  }

  set selectedTaskId(id) {
    this.#selectedTaskId = id;
  }
  get selectedTaskId() {
    return this.#selectedTaskId;
  }

  get selectedTask() {
    return this.#tasks.find((task) => task.id === this.#selectedTaskId);
  }

  deleteTaskById(id) {
    this.#tasks = this.#tasks.filter((task) => task.id !== id);
  }

  addTask(task) {
    this.#tasks.push(task);
  }

  clearCompleteTasks() {
    this.#tasks = this.#tasks.filter((task) => !task.complete);
  }
}


/***/ }),

/***/ "./src/modules/Task.js":
/*!*****************************!*\
  !*** ./src/modules/Task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");


class Task {
  #id;
  #name;
  #dueDate;
  #priority;
  #complete;

  constructor(name, dueDate, priority) {
    this.#id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
    this.#name = name;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#complete = false;
  }

  set id(value) {
    this.#id = value;
  }
  get id() {
    return this.#id;
  }

  set name(name) {
    this.#name = name;
  }
  get name() {
    return this.#name;
  }

  set dueDate(date) {
    this.#dueDate = date;
  }
  get dueDate() {
    return this.#dueDate;
  }

  set priority(priority) {
    this.#priority = priority;
  }
  get priority() {
    return this.#priority;
  }

  set complete(value) {
    this.#complete = value;
  }
  get complete() {
    return this.#complete;
  }

  getDateFormatted() {
    if (this.#dueDate && this.#dueDate.split) {
      const [year, month, day] = this.#dueDate.split("/");
      return `${month}/${day}/${year}`;
    }
    return this.#dueDate; // Return the original date if it's not in the expected format
  }
}


/***/ }),

/***/ "./src/modules/TodoList.js":
/*!*********************************!*\
  !*** ./src/modules/TodoList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TodoList)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/modules/Project.js");


class TodoList {
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
      this.#inboxProject = new _Project__WEBPACK_IMPORTED_MODULE_0__["default"]("Inbox");
      this.#inboxProject.default = true;
      this.#projects.push(this.#inboxProject);
      this.#selectedProjectId = this.#inboxProject.id;
    }

    if (!todayExists) {
      this.#todayProject = new _Project__WEBPACK_IMPORTED_MODULE_0__["default"]("Today");
      this.#todayProject.default = true;
      this.#todayProject.tasks = this.getTodayTasks();
      this.#projects.push(this.#todayProject);
    }

    if (!weekExists) {
      this.#weekProject = new _Project__WEBPACK_IMPORTED_MODULE_0__["default"]("This week");
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


/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isToday.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/toDate.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isThisWeek.mjs");
/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoList */ "./src/modules/TodoList.js");
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ "./src/modules/Project.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");





class UI {
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
    this.#todoList = new _TodoList__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
      const project = new _Project__WEBPACK_IMPORTED_MODULE_1__["default"](projectName);
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
      const task = new _Task__WEBPACK_IMPORTED_MODULE_2__["default"](taskName, taskDueDate, taskPriority);
      this.#newTaskNameInput.value = null;
      this.#todoList.selectedProject.addTask(task);

      const formatDate = new Date(task.getDateFormatted());
      if ((0,date_fns__WEBPACK_IMPORTED_MODULE_3__.isToday)((0,date_fns__WEBPACK_IMPORTED_MODULE_4__.toDate)(formatDate))) {
        this.#todoList.todayProject.addTask(task);
      }

      if ((0,date_fns__WEBPACK_IMPORTED_MODULE_5__.isThisWeek)((0,date_fns__WEBPACK_IMPORTED_MODULE_4__.toDate)(formatDate))) {
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
          const loadedProject = new _Project__WEBPACK_IMPORTED_MODULE_1__["default"](project.name);
          loadedProject.id = project.id;
          loadedProject.default = false;
          project.tasks.forEach((task) => {
            const loadedTask = new _Task__WEBPACK_IMPORTED_MODULE_2__["default"](task.name, task.dueDate, task.priority);
            loadedTask.id = task.id;
            loadedTask.complete = task.complete;
            loadedProject.tasks.push(loadedTask);
          });
          this.#todoList.addProject(loadedProject);
        } else {
          switch (project.name) {
            case "Inbox":
              const loadedInbox = new _Project__WEBPACK_IMPORTED_MODULE_1__["default"]("Inbox");
              loadedInbox.id = project.id;
              loadedInbox.default = true;
              project.tasks.forEach((task) => {
                const loadedTask = new _Task__WEBPACK_IMPORTED_MODULE_2__["default"](
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
              const loadedToday = new _Project__WEBPACK_IMPORTED_MODULE_1__["default"]("Today");
              loadedToday.id = project.id;
              loadedToday.default = true;
              project.tasks.forEach((task) => {
                const loadedTask = new _Task__WEBPACK_IMPORTED_MODULE_2__["default"](
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
              const loadedWeek = new _Project__WEBPACK_IMPORTED_MODULE_1__["default"]("This week");
              loadedWeek.id = project.id;
              loadedWeek.default = true;
              project.tasks.forEach((task) => {
                const loadedTask = new _Task__WEBPACK_IMPORTED_MODULE_2__["default"](
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


/***/ }),

/***/ "./node_modules/date-fns/_lib/defaultOptions.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultOptions.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: () => (/* binding */ getDefaultOptions),
/* harmony export */   setDefaultOptions: () => (/* binding */ setDefaultOptions)
/* harmony export */ });
let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}


/***/ }),

/***/ "./node_modules/date-fns/isSameDay.mjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/isSameDay.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isSameDay: () => (/* binding */ isSameDay)
/* harmony export */ });
/* harmony import */ var _startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startOfDay.mjs */ "./node_modules/date-fns/startOfDay.mjs");


/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check

 * @returns The dates are in the same day (and year and month)
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(dateLeft, dateRight) {
  const dateLeftStartOfDay = (0,_startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateLeft);
  const dateRightStartOfDay = (0,_startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateRight);

  return +dateLeftStartOfDay === +dateRightStartOfDay;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSameDay);


/***/ }),

/***/ "./node_modules/date-fns/isSameWeek.mjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isSameWeek.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isSameWeek: () => (/* binding */ isSameWeek)
/* harmony export */ });
/* harmony import */ var _startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startOfWeek.mjs */ "./node_modules/date-fns/startOfWeek.mjs");


/**
 * The {@link isSameWeek} function options.
 */

/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same week (and month and year)
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameWeek(dateLeft, dateRight, options) {
  const dateLeftStartOfWeek = (0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfWeek)(dateLeft, options);
  const dateRightStartOfWeek = (0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfWeek)(dateRight, options);

  return +dateLeftStartOfWeek === +dateRightStartOfWeek;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSameWeek);


/***/ }),

/***/ "./node_modules/date-fns/isThisWeek.mjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isThisWeek.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isThisWeek: () => (/* binding */ isThisWeek)
/* harmony export */ });
/* harmony import */ var _isSameWeek_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSameWeek.mjs */ "./node_modules/date-fns/isSameWeek.mjs");


/**
 * The {@link isThisWeek} function options.
 */

/**
 * @name isThisWeek
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to check
 * @param options - The object with options
 *
 * @returns The date is in this week
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */
function isThisWeek(date, options) {
  return (0,_isSameWeek_mjs__WEBPACK_IMPORTED_MODULE_0__.isSameWeek)(date, Date.now(), options);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isThisWeek);


/***/ }),

/***/ "./node_modules/date-fns/isToday.mjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/isToday.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isToday: () => (/* binding */ isToday)
/* harmony export */ });
/* harmony import */ var _isSameDay_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSameDay.mjs */ "./node_modules/date-fns/isSameDay.mjs");


/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to check
 *
 * @returns The date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(date) {
  return (0,_isSameDay_mjs__WEBPACK_IMPORTED_MODULE_0__.isSameDay)(date, Date.now());
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isToday);


/***/ }),

/***/ "./node_modules/date-fns/startOfDay.mjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/startOfDay.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfDay: () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfDay);


/***/ }),

/***/ "./node_modules/date-fns/startOfWeek.mjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfWeek.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfWeek: () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ "./node_modules/date-fns/_lib/defaultOptions.mjs");



/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_1__.toDate)(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfWeek);


/***/ }),

/***/ "./node_modules/date-fns/toDate.mjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/toDate.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (
    argument instanceof Date ||
    (typeof argument === "object" && argStr === "[object Date]")
  ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new argument.constructor(+argument);
  } else if (
    typeof argument === "number" ||
    argStr === "[object Number]" ||
    typeof argument === "string" ||
    argStr === "[object String]"
  ) {
    // TODO: Can we get rid of as?
    return new Date(argument);
  } else {
    // TODO: Can we get rid of as?
    return new Date(NaN);
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toDate);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/UI */ "./src/modules/UI.js");

var ui = new _modules_UI__WEBPACK_IMPORTED_MODULE_0__["default"]();
ui.init();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxSHVEO0FBQ3JCO0FBQ0Y7QUFDTjtBQUMxQjtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixpREFBUTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsZ0RBQU87QUFDakM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw2Q0FBSTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsaURBQU8sQ0FBQyxnREFBTTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxVQUFVLG9EQUFVLENBQUMsZ0RBQU07QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7O1VDekR0QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjhCO0FBQzlCLGFBQWEsbURBQUU7QUFDZiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Ub2RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9kZWZhdWx0T3B0aW9ucy5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzU2FtZURheS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzU2FtZVdlZWsubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc1RoaXNXZWVrLm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNUb2RheS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZEYXkubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mV2Vlay5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3RvRGF0ZS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSBcInV1aWRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xyXG4gICNpZDtcclxuICAjbmFtZTtcclxuICAjZGVmYXVsdDtcclxuICAjdGFza3M7XHJcbiAgI3NlbGVjdGVkVGFzaztcclxuICAjc2VsZWN0ZWRUYXNrSWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgIHRoaXMuI2lkID0gdXVpZHY0KCk7XHJcbiAgICB0aGlzLiNuYW1lID0gbmFtZTtcclxuICAgIHRoaXMuI2RlZmF1bHQgPSBmYWxzZTtcclxuICAgIHRoaXMuI3Rhc2tzID0gW107XHJcbiAgfVxyXG5cclxuICBzZXQgaWQodmFsdWUpIHtcclxuICAgIHRoaXMuI2lkID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgaWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jaWQ7XHJcbiAgfVxyXG5cclxuICBzZXQgbmFtZShuYW1lKSB7XHJcbiAgICB0aGlzLiNuYW1lID0gbmFtZTtcclxuICB9XHJcbiAgZ2V0IG5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jbmFtZTtcclxuICB9XHJcblxyXG4gIHNldCBkZWZhdWx0KHZhbHVlKSB7XHJcbiAgICB0aGlzLiNkZWZhdWx0ID0gdmFsdWU7XHJcbiAgfVxyXG4gIGdldCBkZWZhdWx0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI2RlZmF1bHQ7XHJcbiAgfVxyXG5cclxuICBzZXQgdGFza3ModGFza3MpIHtcclxuICAgIHRoaXMuI3Rhc2tzID0gdGFza3M7XHJcbiAgfVxyXG4gIGdldCB0YXNrcygpIHtcclxuICAgIHJldHVybiB0aGlzLiN0YXNrcztcclxuICB9XHJcblxyXG4gIHNldCBzZWxlY3RlZFRhc2tJZChpZCkge1xyXG4gICAgdGhpcy4jc2VsZWN0ZWRUYXNrSWQgPSBpZDtcclxuICB9XHJcbiAgZ2V0IHNlbGVjdGVkVGFza0lkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI3NlbGVjdGVkVGFza0lkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNlbGVjdGVkVGFzaygpIHtcclxuICAgIHJldHVybiB0aGlzLiN0YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLmlkID09PSB0aGlzLiNzZWxlY3RlZFRhc2tJZCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVUYXNrQnlJZChpZCkge1xyXG4gICAgdGhpcy4jdGFza3MgPSB0aGlzLiN0YXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2suaWQgIT09IGlkKTtcclxuICB9XHJcblxyXG4gIGFkZFRhc2sodGFzaykge1xyXG4gICAgdGhpcy4jdGFza3MucHVzaCh0YXNrKTtcclxuICB9XHJcblxyXG4gIGNsZWFyQ29tcGxldGVUYXNrcygpIHtcclxuICAgIHRoaXMuI3Rhc2tzID0gdGhpcy4jdGFza3MuZmlsdGVyKCh0YXNrKSA9PiAhdGFzay5jb21wbGV0ZSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gXCJ1dWlkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcclxuICAjaWQ7XHJcbiAgI25hbWU7XHJcbiAgI2R1ZURhdGU7XHJcbiAgI3ByaW9yaXR5O1xyXG4gICNjb21wbGV0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IobmFtZSwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcclxuICAgIHRoaXMuI2lkID0gdXVpZHY0KCk7XHJcbiAgICB0aGlzLiNuYW1lID0gbmFtZTtcclxuICAgIHRoaXMuI2R1ZURhdGUgPSBkdWVEYXRlO1xyXG4gICAgdGhpcy4jcHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgIHRoaXMuI2NvbXBsZXRlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXQgaWQodmFsdWUpIHtcclxuICAgIHRoaXMuI2lkID0gdmFsdWU7XHJcbiAgfVxyXG4gIGdldCBpZCgpIHtcclxuICAgIHJldHVybiB0aGlzLiNpZDtcclxuICB9XHJcblxyXG4gIHNldCBuYW1lKG5hbWUpIHtcclxuICAgIHRoaXMuI25hbWUgPSBuYW1lO1xyXG4gIH1cclxuICBnZXQgbmFtZSgpIHtcclxuICAgIHJldHVybiB0aGlzLiNuYW1lO1xyXG4gIH1cclxuXHJcbiAgc2V0IGR1ZURhdGUoZGF0ZSkge1xyXG4gICAgdGhpcy4jZHVlRGF0ZSA9IGRhdGU7XHJcbiAgfVxyXG4gIGdldCBkdWVEYXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI2R1ZURhdGU7XHJcbiAgfVxyXG5cclxuICBzZXQgcHJpb3JpdHkocHJpb3JpdHkpIHtcclxuICAgIHRoaXMuI3ByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgfVxyXG4gIGdldCBwcmlvcml0eSgpIHtcclxuICAgIHJldHVybiB0aGlzLiNwcmlvcml0eTtcclxuICB9XHJcblxyXG4gIHNldCBjb21wbGV0ZSh2YWx1ZSkge1xyXG4gICAgdGhpcy4jY29tcGxldGUgPSB2YWx1ZTtcclxuICB9XHJcbiAgZ2V0IGNvbXBsZXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI2NvbXBsZXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF0ZUZvcm1hdHRlZCgpIHtcclxuICAgIGlmICh0aGlzLiNkdWVEYXRlICYmIHRoaXMuI2R1ZURhdGUuc3BsaXQpIHtcclxuICAgICAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gdGhpcy4jZHVlRGF0ZS5zcGxpdChcIi9cIik7XHJcbiAgICAgIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuI2R1ZURhdGU7IC8vIFJldHVybiB0aGUgb3JpZ2luYWwgZGF0ZSBpZiBpdCdzIG5vdCBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQcm9qZWN0IGZyb20gXCIuL1Byb2plY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9MaXN0IHtcclxuICAjcHJvamVjdHM7XHJcbiAgI3NlbGVjdGVkUHJvamVjdElkO1xyXG4gICNpbmJveFByb2plY3Q7XHJcbiAgI3RvZGF5UHJvamVjdDtcclxuICAjd2Vla1Byb2plY3Q7XHJcbiAgI3NlbGVjdGVkUHJvamVjdDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLiNwcm9qZWN0cyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgbG9hZERlZmF1bHRQcm9qZWN0cygpIHtcclxuICAgIGNvbnN0IGluYm94RXhpc3RzID0gdGhpcy4jcHJvamVjdHMuc29tZSgobGlzdCkgPT4gbGlzdC5uYW1lID09PSBcIkluYm94XCIpO1xyXG4gICAgY29uc3QgdG9kYXlFeGlzdHMgPSB0aGlzLiNwcm9qZWN0cy5zb21lKChsaXN0KSA9PiBsaXN0Lm5hbWUgPT09IFwiVG9kYXlcIik7XHJcbiAgICBjb25zdCB3ZWVrRXhpc3RzID0gdGhpcy4jcHJvamVjdHMuc29tZSgobGlzdCkgPT4gbGlzdC5uYW1lID09PSBcIlRoaXMgd2Vla1wiKTtcclxuXHJcbiAgICBpZiAoIWluYm94RXhpc3RzKSB7XHJcbiAgICAgIHRoaXMuI2luYm94UHJvamVjdCA9IG5ldyBQcm9qZWN0KFwiSW5ib3hcIik7XHJcbiAgICAgIHRoaXMuI2luYm94UHJvamVjdC5kZWZhdWx0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy4jcHJvamVjdHMucHVzaCh0aGlzLiNpbmJveFByb2plY3QpO1xyXG4gICAgICB0aGlzLiNzZWxlY3RlZFByb2plY3RJZCA9IHRoaXMuI2luYm94UHJvamVjdC5pZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRvZGF5RXhpc3RzKSB7XHJcbiAgICAgIHRoaXMuI3RvZGF5UHJvamVjdCA9IG5ldyBQcm9qZWN0KFwiVG9kYXlcIik7XHJcbiAgICAgIHRoaXMuI3RvZGF5UHJvamVjdC5kZWZhdWx0ID0gdHJ1ZTtcclxuICAgICAgdGhpcy4jdG9kYXlQcm9qZWN0LnRhc2tzID0gdGhpcy5nZXRUb2RheVRhc2tzKCk7XHJcbiAgICAgIHRoaXMuI3Byb2plY3RzLnB1c2godGhpcy4jdG9kYXlQcm9qZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXdlZWtFeGlzdHMpIHtcclxuICAgICAgdGhpcy4jd2Vla1Byb2plY3QgPSBuZXcgUHJvamVjdChcIlRoaXMgd2Vla1wiKTtcclxuICAgICAgdGhpcy4jd2Vla1Byb2plY3QuZGVmYXVsdCA9IHRydWU7XHJcbiAgICAgIHRoaXMuI3dlZWtQcm9qZWN0LnRhc2tzID0gdGhpcy5nZXRXZWVrVGFza3MoKTtcclxuICAgICAgdGhpcy4jcHJvamVjdHMucHVzaCh0aGlzLiN3ZWVrUHJvamVjdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRUb2RheVRhc2tzKCkge1xyXG4gICAgY29uc3QgdG9kYXlUYXNrcyA9IFtdO1xyXG4gICAgdGhpcy4jcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICBwcm9qZWN0LnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IG5ldyBEYXRlKGdldERhdGVGb3JtYXR0ZWQodGFzay5kdWVEYXRlKSk7XHJcbiAgICAgICAgaWYgKGlzVG9kYXkodG9EYXRlKHRhc2tEYXRlKSkpIHtcclxuICAgICAgICAgIHRvZGF5VGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRvZGF5VGFza3M7XHJcbiAgfVxyXG5cclxuICBnZXRXZWVrVGFza3MoKSB7XHJcbiAgICBjb25zdCB3ZWVrVGFza3MgPSBbXTtcclxuICAgIHRoaXMuI3Byb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgICAgcHJvamVjdC50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFza0RhdGUgPSBuZXcgRGF0ZShnZXREYXRlRm9ybWF0dGVkKHRhc2suZHVlRGF0ZSkpO1xyXG4gICAgICAgIGlmIChpc1RoaXNXZWVrKHRvRGF0ZSh0YXNrRGF0ZSkpKSB7XHJcbiAgICAgICAgICB3ZWVrVGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHdlZWtUYXNrcztcclxuICB9XHJcblxyXG4gIGRlbGV0ZVByb2plY3QoaWQpIHtcclxuICAgIHRoaXMuI3Byb2plY3RzID0gdGhpcy4jcHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkICE9PSBpZCk7XHJcbiAgICB0aGlzLiNzZWxlY3RlZFByb2plY3RJZCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9qZWN0KHByb2plY3QpIHtcclxuICAgIHRoaXMuI3Byb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbiAgfVxyXG5cclxuICBzZXQgcHJvamVjdHModmFsdWUpIHtcclxuICAgIHRoaXMuI3Byb2plY3RzID0gdmFsdWU7XHJcbiAgfVxyXG4gIGdldCBwcm9qZWN0cygpIHtcclxuICAgIHJldHVybiB0aGlzLiNwcm9qZWN0cztcclxuICB9XHJcblxyXG4gIHNldCBpbmJveFByb2plY3QocHJvamVjdCkge1xyXG4gICAgdGhpcy4jaW5ib3hQcm9qZWN0ID0gcHJvamVjdDtcclxuICB9XHJcbiAgZ2V0IGluYm94UHJvamVjdCgpIHtcclxuICAgIHJldHVybiB0aGlzLiNpbmJveFByb2plY3Q7XHJcbiAgfVxyXG5cclxuICBzZXQgdG9kYXlQcm9qZWN0KHByb2plY3QpIHtcclxuICAgIHRoaXMuI3RvZGF5UHJvamVjdCA9IHByb2plY3Q7XHJcbiAgfVxyXG4gIGdldCB0b2RheVByb2plY3QoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jdG9kYXlQcm9qZWN0O1xyXG4gIH1cclxuXHJcbiAgc2V0IHdlZWtQcm9qZWN0KHByb2plY3QpIHtcclxuICAgIHRoaXMuI3dlZWtQcm9qZWN0ID0gcHJvamVjdDtcclxuICB9XHJcbiAgZ2V0IHdlZWtQcm9qZWN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI3dlZWtQcm9qZWN0O1xyXG4gIH1cclxuXHJcbiAgc2V0IHNlbGVjdGVkUHJvamVjdElkKHZhbHVlKSB7XHJcbiAgICB0aGlzLiNzZWxlY3RlZFByb2plY3RJZCA9IHZhbHVlO1xyXG4gIH1cclxuICBnZXQgc2VsZWN0ZWRQcm9qZWN0SWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4jc2VsZWN0ZWRQcm9qZWN0SWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgc2VsZWN0ZWRQcm9qZWN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuI3Byb2plY3RzLmZpbmQoXHJcbiAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09PSB0aGlzLiNzZWxlY3RlZFByb2plY3RJZFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHNldCBzZWxlY3RlZFByb2plY3QodmFsdWUpIHtcclxuICAgIHRoaXMuI3NlbGVjdGVkUHJvamVjdCA9IHZhbHVlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyB0b0RhdGUsIGlzVG9kYXksIGlzVGhpc1dlZWsgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcclxuaW1wb3J0IFRvZG9MaXN0IGZyb20gXCIuL1RvZG9MaXN0XCI7XHJcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL1Byb2plY3RcIjtcclxuaW1wb3J0IFRhc2sgZnJvbSBcIi4vVGFza1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xyXG4gICNkZWZhdWx0UHJvamVjdENvbnRhaW5lcjtcclxuICAjcHJvamVjdENvbnRhaW5lcjtcclxuICAjbmV3UHJvamVjdEZvcm07XHJcbiAgI25ld1Byb2plY3RJbnB1dDtcclxuICAjcHJvamVjdERpc3BsYXlDb250YWluZXI7XHJcbiAgI3Byb2plY3RUaXRsZUVsZW1lbnQ7XHJcbiAgI3Byb2plY3RDb3VudEVsZW1lbnQ7XHJcbiAgI3Rhc2tzQ29udGFpbmVyO1xyXG4gICN0YXNrVGVtcGxhdGU7XHJcbiAgI25ld1Rhc2tGb3JtO1xyXG4gICNuZXdUYXNrTmFtZUlucHV0O1xyXG4gICNuZXdUYXNrUHJpb3JpdHlJbnB1dDtcclxuICAjbmV3VGFza0R1ZURhdGVJbnB1dDtcclxuICAjY2xlYXJDb21wbGV0ZVRhc2tzQnV0dG9uO1xyXG4gICNkaWFsb2dUYXNrQ3JlYXRvcjtcclxuICAjZGlhbG9nVGFza01vZGlmaWVyO1xyXG4gICNjbG9zZVRhc2tDcmVhdG9yQnV0dG9uO1xyXG4gICNvcGVuVGFza0NyZWF0b3JCdXR0b247XHJcbiAgI2Nsb3NlVGFza01vZGlmaWVyQnV0dG9uO1xyXG4gICNtb2RpZmllclRhc2tGb3JtO1xyXG4gICNtb2RpZmllZFRhc2tOYW1lSW5wdXQ7XHJcbiAgI21vZGlmaWVkVGFza1ByaW9yaXR5SW5wdXQ7XHJcbiAgI21vZGlmaWVkVGFza0R1ZURhdGVJbnB1dDtcclxuICAjcHJpb3JpdHlWYWx1ZTtcclxuXHJcbiAgI3RvZG9MaXN0O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZURvbUVsZW1lbnRzKCk7XHJcbiAgICB0aGlzLiN0b2RvTGlzdCA9IG5ldyBUb2RvTGlzdCgpO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6ZURvbUVsZW1lbnRzKCkge1xyXG4gICAgdGhpcy4jZGVmYXVsdFByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIltkYXRhLWRlZmF1bHQtcHJvamVjdF1cIlxyXG4gICAgKTtcclxuICAgIHRoaXMuI3Byb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtcHJvamVjdF1cIik7XHJcbiAgICB0aGlzLiNuZXdQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1uZXctcHJvamVjdC1mb3JtXVwiKTtcclxuICAgIHRoaXMuI25ld1Byb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1uZXctcHJvamVjdC1pbnB1dF1cIik7XHJcbiAgICB0aGlzLiNwcm9qZWN0RGlzcGxheUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiW2RhdGEtcHJvamVjdC1kaXNwbGF5LWNvbnRhaW5lcl1cIlxyXG4gICAgKTtcclxuICAgIHRoaXMuI3Byb2plY3RUaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtcHJvamVjdC10aXRsZV1cIik7XHJcbiAgICB0aGlzLiNwcm9qZWN0Q291bnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXByb2plY3QtY291bnRdXCIpO1xyXG4gICAgdGhpcy4jdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtdGFza3NdXCIpO1xyXG4gICAgdGhpcy4jdGFza1RlbXBsYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXRlbXBsYXRlXCIpO1xyXG4gICAgdGhpcy4jbmV3VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbmV3LXRhc2stZm9ybV1cIik7XHJcbiAgICB0aGlzLiNuZXdUYXNrTmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLW5ldy10YXNrLWlucHV0XVwiKTtcclxuICAgIHRoaXMuI25ld1Rhc2tQcmlvcml0eUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCJpbnB1dFtuYW1lPSdwcmlvcml0eSddXCJcclxuICAgICk7XHJcbiAgICB0aGlzLiNuZXdUYXNrRHVlRGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCJbZGF0YS1uZXctdGFzay1kdWUtZGF0ZV1cIlxyXG4gICAgKTtcclxuICAgIHRoaXMuI2NsZWFyQ29tcGxldGVUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiW2RhdGEtY2xlYXItY29tcGxldGUtdGFza3MtYnV0dG9uXVwiXHJcbiAgICApO1xyXG4gICAgdGhpcy4jZGlhbG9nVGFza0NyZWF0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tYm9keVwiKTtcclxuICAgIHRoaXMuI2RpYWxvZ1Rhc2tNb2RpZmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kaWZpZXItdGFza1wiKTtcclxuICAgIHRoaXMuI29wZW5UYXNrQ3JlYXRvckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLm9wZW4tdGFzay1jcmVhdG9yLWJ1dHRvblwiXHJcbiAgICApO1xyXG4gICAgdGhpcy4jY2xvc2VUYXNrQ3JlYXRvckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmJ0bi1jbG9zZS10YXNrLWNyZWF0b3JcIlxyXG4gICAgKTtcclxuICAgIHRoaXMuI2Nsb3NlVGFza01vZGlmaWVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCJbZGF0YS1jbG9zZS10YXNrLW1vZGlmaWVyLWJ1dHRvbl1cIlxyXG4gICAgKTtcclxuICAgIHRoaXMuI21vZGlmaWVyVGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIltkYXRhLW1vZGlmaWVyLXRhc2stZm9ybV1cIlxyXG4gICAgKTtcclxuICAgIHRoaXMuI21vZGlmaWVkVGFza05hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiW2RhdGEtbW9kaWZpZXItdGFzay1uYW1lXVwiXHJcbiAgICApO1xyXG4gICAgdGhpcy4jbW9kaWZpZWRUYXNrUHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiW2RhdGEtbW9kaWZpZXItdGFzay1wcmlvcml0eV1cIlxyXG4gICAgKTtcclxuICAgIHRoaXMuI21vZGlmaWVkVGFza0R1ZURhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiW2RhdGEtbW9kaWZpZXItdGFzay1kdWUtZGF0ZV1cIlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHNldHVwRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLiNkZWZhdWx0UHJvamVjdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSBcImxpXCIpIHtcclxuICAgICAgICB0aGlzLiN0b2RvTGlzdC5zZWxlY3RlZFByb2plY3RJZCA9IGUudGFyZ2V0LmRhdGFzZXQucHJvamVjdElkO1xyXG4gICAgICAgIHRoaXMuc2F2ZUFuZFJlbmRlcigpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLiNwcm9qZWN0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImxpXCIpIHtcclxuICAgICAgICB0aGlzLiN0b2RvTGlzdC5zZWxlY3RlZFByb2plY3RJZCA9IGUudGFyZ2V0LmRhdGFzZXQucHJvamVjdElkO1xyXG4gICAgICAgIHRoaXMuc2F2ZUFuZFJlbmRlcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImJ1dHRvblwiKSB7XHJcbiAgICAgICAgdGhpcy4jdG9kb0xpc3QuZGVsZXRlUHJvamVjdChlLnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucHJvamVjdElkKTtcclxuICAgICAgICB0aGlzLnNhdmVBbmRSZW5kZXIoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4jdGFza3NDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIikge1xyXG4gICAgICAgIHRoaXMuI3RvZG9MaXN0LnNlbGVjdGVkUHJvamVjdC5zZWxlY3RlZFRhc2tJZCA9IGUudGFyZ2V0LmlkO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGFzayA9IHRoaXMuI3RvZG9MaXN0LnNlbGVjdGVkUHJvamVjdC5zZWxlY3RlZFRhc2s7XHJcbiAgICAgICAgc2VsZWN0ZWRUYXNrLmNvbXBsZXRlID0gZS50YXJnZXQuY2hlY2tlZDtcclxuICAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgICAgICB0aGlzLnJlbmRlclRhc2tDb3VudCh0aGlzLiN0b2RvTGlzdC5zZWxlY3RlZFByb2plY3QpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LXRhc2staWNvblwiKSkge1xyXG4gICAgICAgIHRoaXMuI2RpYWxvZ1Rhc2tNb2RpZmllci5zaG93TW9kYWwoKTtcclxuICAgICAgICB0aGlzLiN0b2RvTGlzdC5zZWxlY3RlZFByb2plY3Quc2VsZWN0ZWRUYXNrSWQgPSBlLnRhcmdldC5kYXRhc2V0LnRhc2tJZDtcclxuICAgICAgICB0aGlzLiNtb2RpZmllZFRhc2tOYW1lSW5wdXQudmFsdWUgPVxyXG4gICAgICAgICAgdGhpcy4jdG9kb0xpc3Quc2VsZWN0ZWRQcm9qZWN0LnNlbGVjdGVkVGFzay5uYW1lO1xyXG4gICAgICAgIHRoaXMuI21vZGlmaWVkVGFza0R1ZURhdGVJbnB1dC52YWx1ZSA9XHJcbiAgICAgICAgICB0aGlzLiN0b2RvTGlzdC5zZWxlY3RlZFByb2plY3Quc2VsZWN0ZWRUYXNrLmR1ZURhdGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGUtdGFzay1pY29uXCIpKSB7XHJcbiAgICAgICAgdGhpcy4jdG9kb0xpc3Quc2VsZWN0ZWRQcm9qZWN0LmRlbGV0ZVRhc2tCeUlkKGUudGFyZ2V0LmRhdGFzZXQudGFza0lkKTtcclxuICAgICAgICB0aGlzLnNhdmVBbmRSZW5kZXIoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4jY2xlYXJDb21wbGV0ZVRhc2tzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICB0aGlzLiN0b2RvTGlzdC5zZWxlY3RlZFByb2plY3QuY2xlYXJDb21wbGV0ZVRhc2tzKCk7XHJcbiAgICAgIHRoaXMuc2F2ZUFuZFJlbmRlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4jbmV3UHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gdGhpcy4jbmV3UHJvamVjdElucHV0LnZhbHVlO1xyXG4gICAgICBpZiAocHJvamVjdE5hbWUgPT0gbnVsbCB8fCBwcm9qZWN0TmFtZSA9PSBcIlwiKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0TmFtZSk7XHJcbiAgICAgIHRoaXMuI25ld1Byb2plY3RJbnB1dC52YWx1ZSA9IG51bGw7XHJcbiAgICAgIHRoaXMuI3RvZG9MaXN0LmFkZFByb2plY3QocHJvamVjdCk7XHJcbiAgICAgIHRoaXMuc2F2ZUFuZFJlbmRlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4jbmV3VGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IHRhc2tOYW1lID0gdGhpcy4jbmV3VGFza05hbWVJbnB1dC52YWx1ZTtcclxuICAgICAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAnaW5wdXRbbmFtZT1cInByaW9yaXR5XCJdOmNoZWNrZWQnXHJcbiAgICAgICkudmFsdWU7XHJcbiAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gdGhpcy4jbmV3VGFza0R1ZURhdGVJbnB1dC52YWx1ZTtcclxuICAgICAgaWYgKHRhc2tOYW1lID09IG51bGwgfHwgdGFza05hbWUgPT09IFwiXCIpIHJldHVybjtcclxuICAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKHRhc2tOYW1lLCB0YXNrRHVlRGF0ZSwgdGFza1ByaW9yaXR5KTtcclxuICAgICAgdGhpcy4jbmV3VGFza05hbWVJbnB1dC52YWx1ZSA9IG51bGw7XHJcbiAgICAgIHRoaXMuI3RvZG9MaXN0LnNlbGVjdGVkUHJvamVjdC5hZGRUYXNrKHRhc2spO1xyXG5cclxuICAgICAgY29uc3QgZm9ybWF0RGF0ZSA9IG5ldyBEYXRlKHRhc2suZ2V0RGF0ZUZvcm1hdHRlZCgpKTtcclxuICAgICAgaWYgKGlzVG9kYXkodG9EYXRlKGZvcm1hdERhdGUpKSkge1xyXG4gICAgICAgIHRoaXMuI3RvZG9MaXN0LnRvZGF5UHJvamVjdC5hZGRUYXNrKHRhc2spO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNUaGlzV2Vlayh0b0RhdGUoZm9ybWF0RGF0ZSkpKSB7XHJcbiAgICAgICAgdGhpcy4jdG9kb0xpc3Qud2Vla1Byb2plY3QuYWRkVGFzayh0YXNrKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLiNkaWFsb2dUYXNrQ3JlYXRvci5jbG9zZSgpO1xyXG4gICAgICB0aGlzLnNhdmVBbmRSZW5kZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuI29wZW5UYXNrQ3JlYXRvckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLiNkaWFsb2dUYXNrQ3JlYXRvci5zaG93TW9kYWwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuI2Nsb3NlVGFza0NyZWF0b3JCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy4jZGlhbG9nVGFza0NyZWF0b3IuY2xvc2UoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuI21vZGlmaWVyVGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGNvbnN0IHRhc2tOYW1lID0gdGhpcy4jbW9kaWZpZWRUYXNrTmFtZUlucHV0LnZhbHVlO1xyXG4gICAgICBjb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICdpbnB1dFtuYW1lPVwicHJpb3JpdHlcIl06Y2hlY2tlZCdcclxuICAgICAgKS52YWx1ZTtcclxuICAgICAgY29uc3QgdGFza0R1ZURhdGUgPSB0aGlzLiNtb2RpZmllZFRhc2tEdWVEYXRlSW5wdXQudmFsdWU7XHJcbiAgICAgIGlmICh0YXNrTmFtZSA9PSBudWxsIHx8IHRhc2tOYW1lID09PSBcIlwiKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkVGFzayA9IHRoaXMuI3RvZG9MaXN0LnNlbGVjdGVkUHJvamVjdC5zZWxlY3RlZFRhc2s7XHJcbiAgICAgIHNlbGVjdGVkVGFzay5uYW1lID0gdGFza05hbWU7XHJcbiAgICAgIHNlbGVjdGVkVGFzay5wcmlvcml0eSA9IHRhc2tQcmlvcml0eTtcclxuICAgICAgc2VsZWN0ZWRUYXNrLmR1ZURhdGUgPSB0YXNrRHVlRGF0ZTtcclxuICAgICAgdGhpcy4jZGlhbG9nVGFza01vZGlmaWVyLmNsb3NlKCk7XHJcbiAgICAgIHRoaXMuc2F2ZUFuZFJlbmRlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy4jY2xvc2VUYXNrTW9kaWZpZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy4jZGlhbG9nVGFza01vZGlmaWVyLmNsb3NlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHRoaXMuY2xlYXJFbGVtZW50KHRoaXMuI3Byb2plY3RDb250YWluZXIpO1xyXG4gICAgdGhpcy5jbGVhckVsZW1lbnQodGhpcy4jZGVmYXVsdFByb2plY3RDb250YWluZXIpO1xyXG4gICAgdGhpcy5yZW5kZXJMaXN0cygpO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgdGhpcy4jdG9kb0xpc3Quc2VsZWN0ZWRQcm9qZWN0SWQgPT09IFwibnVsbFwiIHx8XHJcbiAgICAgIHRoaXMuI3RvZG9MaXN0LnNlbGVjdGVkUHJvamVjdElkID09PSBudWxsXHJcbiAgICApIHtcclxuICAgICAgdGhpcy4jcHJvamVjdERpc3BsYXlDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy4jcHJvamVjdERpc3BsYXlDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgICAgIHRoaXMuI3Byb2plY3RUaXRsZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy4jdG9kb0xpc3Quc2VsZWN0ZWRQcm9qZWN0Lm5hbWU7XHJcbiAgICAgIHRoaXMucmVuZGVyVGFza0NvdW50KHRoaXMuI3RvZG9MaXN0LnNlbGVjdGVkUHJvamVjdCk7XHJcbiAgICAgIHRoaXMuY2xlYXJFbGVtZW50KHRoaXMuI3Rhc2tzQ29udGFpbmVyKTtcclxuICAgICAgdGhpcy5yZW5kZXJUYXNrcyh0aGlzLiN0b2RvTGlzdC5zZWxlY3RlZFByb2plY3QpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2F2ZSgpIHtcclxuICAgIGNvbnN0IHByb2plY3RzVG9TYXZlID0gW107XHJcblxyXG4gICAgdGhpcy4jdG9kb0xpc3QucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBwcm9qZWN0T2JqZWN0ID0ge1xyXG4gICAgICAgIG5hbWU6IHByb2plY3QubmFtZSxcclxuICAgICAgICBpZDogcHJvamVjdC5pZCxcclxuICAgICAgICBkZWZhdWx0OiBwcm9qZWN0LmRlZmF1bHQsXHJcbiAgICAgICAgdGFza3M6IFtdLFxyXG4gICAgICB9O1xyXG4gICAgICBwcm9qZWN0LnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgICBjb25zdCB0YXNrT2JqZWN0ID0ge1xyXG4gICAgICAgICAgbmFtZTogdGFzay5uYW1lLFxyXG4gICAgICAgICAgcHJpb3JpdHk6IHRhc2sucHJpb3JpdHksXHJcbiAgICAgICAgICBkdWVEYXRlOiB0YXNrLmR1ZURhdGUsXHJcbiAgICAgICAgICBjb21wbGV0ZTogdGFzay5jb21wbGV0ZSxcclxuICAgICAgICAgIGlkOiB0YXNrLmlkLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcHJvamVjdE9iamVjdC50YXNrcy5wdXNoKHRhc2tPYmplY3QpO1xyXG4gICAgICB9KTtcclxuICAgICAgcHJvamVjdHNUb1NhdmUucHVzaChwcm9qZWN0T2JqZWN0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHNUb1NhdmUpKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2VsZWN0ZWRQcm9qZWN0SWRcIiwgdGhpcy4jdG9kb0xpc3Quc2VsZWN0ZWRQcm9qZWN0SWQpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZUFuZFJlbmRlcigpIHtcclxuICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlclRhc2tzKHNlbGVjdGVkUHJvamVjdCkge1xyXG4gICAgc2VsZWN0ZWRQcm9qZWN0LnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgY29uc3QgdGFza0VsZW1lbnQgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMuI3Rhc2tUZW1wbGF0ZS5jb250ZW50LCB0cnVlKTtcclxuICAgICAgY29uc3QgY2hlY2tib3ggPSB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XHJcbiAgICAgIGNvbnN0IHRhc2tTcGFuID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWluZm9cIik7XHJcbiAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGVcIik7XHJcbiAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5kdWVEYXRlXCIpO1xyXG4gICAgICBjb25zdCBlZGl0SWNvbiA9IHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC10YXNrLWljb25cIik7XHJcbiAgICAgIGVkaXRJY29uLmRhdGFzZXQudGFza0lkID0gdGFzay5pZDtcclxuICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVsZXRlLXRhc2staWNvblwiKTtcclxuICAgICAgZGVsZXRlSWNvbi5kYXRhc2V0LnRhc2tJZCA9IHRhc2suaWQ7XHJcbiAgICAgIGNvbnN0IGN1c3RvbUNoZWNrYm94ID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXN0b20tY2hlY2tib3hcIik7XHJcbiAgICAgIGN1c3RvbUNoZWNrYm94LnN0eWxlLmJvcmRlckNvbG9yID0gdGFzay5wcmlvcml0eTtcclxuICAgICAgY2hlY2tib3guaWQgPSB0YXNrLmlkO1xyXG4gICAgICBjaGVja2JveC5jaGVja2VkID0gdGFzay5jb21wbGV0ZTtcclxuICAgICAgdGFza1RpdGxlLmlubmVyVGV4dCA9IHRhc2submFtZTtcclxuICAgICAgdGFza0R1ZURhdGUuaW5uZXJUZXh0ID0gdGFzay5kdWVEYXRlO1xyXG4gICAgICBjb25zdCBsYWJlbCA9IHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsYWJlbFwiKTtcclxuICAgICAgbGFiZWwuaHRtbEZvciA9IHRhc2suaWQ7XHJcbiAgICAgIGxhYmVsLmRhdGFzZXQudGFza0lkID0gdGFzay5pZDtcclxuICAgICAgdGhpcy4jdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJUYXNrQ291bnQoc2VsZWN0ZWRQcm9qZWN0KSB7XHJcbiAgICBjb25zdCBpbmNvbXBsZXRlVGFza3NDb3VudCA9IHNlbGVjdGVkUHJvamVjdC50YXNrcy5maWx0ZXIoXHJcbiAgICAgICh0YXNrKSA9PiAhdGFzay5jb21wbGV0ZVxyXG4gICAgKS5sZW5ndGg7XHJcbiAgICBjb25zdCB0YXNrU3RyaW5nID0gaW5jb21wbGV0ZVRhc2tzQ291bnQgPT09IDEgPyBcInRhc2tcIiA6IFwidGFza3NcIjtcclxuICAgIHRoaXMuI3Byb2plY3RDb3VudEVsZW1lbnQuaW5uZXJUZXh0ID0gYCR7aW5jb21wbGV0ZVRhc2tzQ291bnR9ICR7dGFza1N0cmluZ30gcmVtYWluaW5nYDtcclxuICB9XHJcblxyXG4gIHJlbmRlckxpc3RzKCkge1xyXG4gICAgdGhpcy4jdG9kb0xpc3QucHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICBpZiAoIXByb2plY3QuZGVmYXVsdCkge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGRlbGV0ZVByb2plY3RCdXR0b24uaW5uZXJIVE1MID0gXCLinJZcIjtcclxuICAgICAgICBkZWxldGVQcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIik7XHJcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuZGF0YXNldC5wcm9qZWN0SWQgPSBwcm9qZWN0LmlkO1xyXG4gICAgICAgIHByb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XHJcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuaW5uZXJUZXh0ID0gcHJvamVjdC5uYW1lO1xyXG4gICAgICAgIHByb2plY3RFbGVtZW50LmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdXR0b24pO1xyXG5cclxuICAgICAgICBpZiAocHJvamVjdC5pZCA9PT0gdGhpcy4jdG9kb0xpc3Quc2VsZWN0ZWRQcm9qZWN0SWQpIHtcclxuICAgICAgICAgIHByb2plY3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtcHJvamVjdFwiKTtcclxuICAgICAgICAgIGRlbGV0ZVByb2plY3RCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuI3Byb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEVsZW1lbnQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICBkZWZhdWx0UHJvamVjdEVsZW1lbnQuZGF0YXNldC5wcm9qZWN0SWQgPSBwcm9qZWN0LmlkO1xyXG4gICAgICAgIGRlZmF1bHRQcm9qZWN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xyXG4gICAgICAgIGRlZmF1bHRQcm9qZWN0RWxlbWVudC5pbm5lclRleHQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgICAgaWYgKHByb2plY3QuaWQgPT09IHRoaXMuI3RvZG9MaXN0LnNlbGVjdGVkUHJvamVjdElkKSB7XHJcbiAgICAgICAgICBkZWZhdWx0UHJvamVjdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1wcm9qZWN0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiNkZWZhdWx0UHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChkZWZhdWx0UHJvamVjdEVsZW1lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsZWFyRWxlbWVudChlbGVtZW50KSB7XHJcbiAgICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvYWQoKSB7XHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSA9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuI3RvZG9MaXN0LmxvYWREZWZhdWx0UHJvamVjdHMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGxvYWRQcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSk7XHJcbiAgICAgIGxvYWRQcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKCFwcm9qZWN0LmRlZmF1bHQpIHtcclxuICAgICAgICAgIGNvbnN0IGxvYWRlZFByb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0Lm5hbWUpO1xyXG4gICAgICAgICAgbG9hZGVkUHJvamVjdC5pZCA9IHByb2plY3QuaWQ7XHJcbiAgICAgICAgICBsb2FkZWRQcm9qZWN0LmRlZmF1bHQgPSBmYWxzZTtcclxuICAgICAgICAgIHByb2plY3QudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsb2FkZWRUYXNrID0gbmV3IFRhc2sodGFzay5uYW1lLCB0YXNrLmR1ZURhdGUsIHRhc2sucHJpb3JpdHkpO1xyXG4gICAgICAgICAgICBsb2FkZWRUYXNrLmlkID0gdGFzay5pZDtcclxuICAgICAgICAgICAgbG9hZGVkVGFzay5jb21wbGV0ZSA9IHRhc2suY29tcGxldGU7XHJcbiAgICAgICAgICAgIGxvYWRlZFByb2plY3QudGFza3MucHVzaChsb2FkZWRUYXNrKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy4jdG9kb0xpc3QuYWRkUHJvamVjdChsb2FkZWRQcm9qZWN0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3dpdGNoIChwcm9qZWN0Lm5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkluYm94XCI6XHJcbiAgICAgICAgICAgICAgY29uc3QgbG9hZGVkSW5ib3ggPSBuZXcgUHJvamVjdChcIkluYm94XCIpO1xyXG4gICAgICAgICAgICAgIGxvYWRlZEluYm94LmlkID0gcHJvamVjdC5pZDtcclxuICAgICAgICAgICAgICBsb2FkZWRJbmJveC5kZWZhdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBwcm9qZWN0LnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRlZFRhc2sgPSBuZXcgVGFzayhcclxuICAgICAgICAgICAgICAgICAgdGFzay5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICB0YXNrLmR1ZURhdGUsXHJcbiAgICAgICAgICAgICAgICAgIHRhc2sucHJpb3JpdHlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWRUYXNrLmlkID0gdGFzay5pZDtcclxuICAgICAgICAgICAgICAgIGxvYWRlZFRhc2suY29tcGxldGUgPSB0YXNrLmNvbXBsZXRlO1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkSW5ib3gudGFza3MucHVzaChsb2FkZWRUYXNrKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLiN0b2RvTGlzdC5pbmJveFByb2plY3QgPSBsb2FkZWRJbmJveDtcclxuICAgICAgICAgICAgICB0aGlzLiN0b2RvTGlzdC5hZGRQcm9qZWN0KHRoaXMuI3RvZG9MaXN0LmluYm94UHJvamVjdCk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiVG9kYXlcIjpcclxuICAgICAgICAgICAgICBjb25zdCBsb2FkZWRUb2RheSA9IG5ldyBQcm9qZWN0KFwiVG9kYXlcIik7XHJcbiAgICAgICAgICAgICAgbG9hZGVkVG9kYXkuaWQgPSBwcm9qZWN0LmlkO1xyXG4gICAgICAgICAgICAgIGxvYWRlZFRvZGF5LmRlZmF1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHByb2plY3QudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9hZGVkVGFzayA9IG5ldyBUYXNrKFxyXG4gICAgICAgICAgICAgICAgICB0YXNrLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgIHRhc2suZHVlRGF0ZSxcclxuICAgICAgICAgICAgICAgICAgdGFzay5wcmlvcml0eVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGxvYWRlZFRhc2suaWQgPSB0YXNrLmlkO1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkVGFzay5jb21wbGV0ZSA9IHRhc2suY29tcGxldGU7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWRUb2RheS50YXNrcy5wdXNoKGxvYWRlZFRhc2spO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHRoaXMuI3RvZG9MaXN0LnRvZGF5UHJvamVjdCA9IGxvYWRlZFRvZGF5O1xyXG4gICAgICAgICAgICAgIHRoaXMuI3RvZG9MaXN0LmFkZFByb2plY3QodGhpcy4jdG9kb0xpc3QudG9kYXlQcm9qZWN0KTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJUaGlzIHdlZWtcIjpcclxuICAgICAgICAgICAgICBjb25zdCBsb2FkZWRXZWVrID0gbmV3IFByb2plY3QoXCJUaGlzIHdlZWtcIik7XHJcbiAgICAgICAgICAgICAgbG9hZGVkV2Vlay5pZCA9IHByb2plY3QuaWQ7XHJcbiAgICAgICAgICAgICAgbG9hZGVkV2Vlay5kZWZhdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBwcm9qZWN0LnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRlZFRhc2sgPSBuZXcgVGFzayhcclxuICAgICAgICAgICAgICAgICAgdGFzay5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICB0YXNrLmR1ZURhdGUsXHJcbiAgICAgICAgICAgICAgICAgIHRhc2sucHJpb3JpdHlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWRUYXNrLmlkID0gdGFzay5pZDtcclxuICAgICAgICAgICAgICAgIGxvYWRlZFRhc2suY29tcGxldGUgPSB0YXNrLmNvbXBsZXRlO1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkV2Vlay50YXNrcy5wdXNoKGxvYWRlZFRhc2spO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHRoaXMuI3RvZG9MaXN0LndlZWtQcm9qZWN0ID0gbG9hZGVkV2VlaztcclxuICAgICAgICAgICAgICB0aGlzLiN0b2RvTGlzdC5hZGRQcm9qZWN0KHRoaXMuI3RvZG9MaXN0LndlZWtQcm9qZWN0KTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuI3RvZG9MaXN0LnNlbGVjdGVkUHJvamVjdElkID1cclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2VsZWN0ZWRQcm9qZWN0SWRcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIHRoaXMubG9hZCgpO1xyXG4gICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxufVxyXG4iLCJsZXQgZGVmYXVsdE9wdGlvbnMgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRPcHRpb25zKCkge1xuICByZXR1cm4gZGVmYXVsdE9wdGlvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0T3B0aW9ucyhuZXdPcHRpb25zKSB7XG4gIGRlZmF1bHRPcHRpb25zID0gbmV3T3B0aW9ucztcbn1cbiIsImltcG9ydCB7IHN0YXJ0T2ZEYXkgfSBmcm9tIFwiLi9zdGFydE9mRGF5Lm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGlzU2FtZURheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIGRheSAoYW5kIHllYXIgYW5kIG1vbnRoKT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgZGF5IChhbmQgeWVhciBhbmQgbW9udGgpP1xuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlTGVmdCAtIFRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0gZGF0ZVJpZ2h0IC0gVGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrXG5cbiAqIEByZXR1cm5zIFRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgZGF5IChhbmQgeWVhciBhbmQgbW9udGgpXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSA0IFNlcHRlbWJlciAwNjowMDowMCBhbmQgNCBTZXB0ZW1iZXIgMTg6MDA6MDAgaW4gdGhlIHNhbWUgZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDQsIDYsIDApLCBuZXcgRGF0ZSgyMDE0LCA4LCA0LCAxOCwgMCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyIGFuZCA0IE9jdG9iZXIgaW4gdGhlIHNhbWUgZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDQpLCBuZXcgRGF0ZSgyMDE0LCA5LCA0KSlcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyLCAyMDE0IGFuZCA0IFNlcHRlbWJlciwgMjAxNSBpbiB0aGUgc2FtZSBkYXk/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVEYXkobmV3IERhdGUoMjAxNCwgOCwgNCksIG5ldyBEYXRlKDIwMTUsIDgsIDQpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lRGF5KGRhdGVMZWZ0LCBkYXRlUmlnaHQpIHtcbiAgY29uc3QgZGF0ZUxlZnRTdGFydE9mRGF5ID0gc3RhcnRPZkRheShkYXRlTGVmdCk7XG4gIGNvbnN0IGRhdGVSaWdodFN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRhdGVSaWdodCk7XG5cbiAgcmV0dXJuICtkYXRlTGVmdFN0YXJ0T2ZEYXkgPT09ICtkYXRlUmlnaHRTdGFydE9mRGF5O1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzU2FtZURheTtcbiIsImltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBpc1NhbWVXZWVrfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgaXNTYW1lV2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSB3ZWVrIChhbmQgbW9udGggYW5kIHllYXIpP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSB3ZWVrIChhbmQgbW9udGggYW5kIHllYXIpP1xuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlTGVmdCAtIFRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0gZGF0ZVJpZ2h0IC0gVGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF0ZXMgYXJlIGluIHRoZSBzYW1lIHdlZWsgKGFuZCBtb250aCBhbmQgeWVhcilcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDMxIEF1Z3VzdCAyMDE0IGFuZCA0IFNlcHRlbWJlciAyMDE0IGluIHRoZSBzYW1lIHdlZWs/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVXZWVrKG5ldyBEYXRlKDIwMTQsIDcsIDMxKSwgbmV3IERhdGUoMjAxNCwgOCwgNCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgd2VlayBzdGFydHMgd2l0aCBNb25kYXksXG4gKiAvLyBhcmUgMzEgQXVndXN0IDIwMTQgYW5kIDQgU2VwdGVtYmVyIDIwMTQgaW4gdGhlIHNhbWUgd2Vlaz9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzU2FtZVdlZWsobmV3IERhdGUoMjAxNCwgNywgMzEpLCBuZXcgRGF0ZSgyMDE0LCA4LCA0KSwge1xuICogICB3ZWVrU3RhcnRzT246IDFcbiAqIH0pXG4gKiAvLz0+IGZhbHNlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSAxIEphbnVhcnkgMjAxNCBhbmQgMSBKYW51YXJ5IDIwMTUgaW4gdGhlIHNhbWUgd2Vlaz9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzU2FtZVdlZWsobmV3IERhdGUoMjAxNCwgMCwgMSksIG5ldyBEYXRlKDIwMTUsIDAsIDEpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lV2VlayhkYXRlTGVmdCwgZGF0ZVJpZ2h0LCBvcHRpb25zKSB7XG4gIGNvbnN0IGRhdGVMZWZ0U3RhcnRPZldlZWsgPSBzdGFydE9mV2VlayhkYXRlTGVmdCwgb3B0aW9ucyk7XG4gIGNvbnN0IGRhdGVSaWdodFN0YXJ0T2ZXZWVrID0gc3RhcnRPZldlZWsoZGF0ZVJpZ2h0LCBvcHRpb25zKTtcblxuICByZXR1cm4gK2RhdGVMZWZ0U3RhcnRPZldlZWsgPT09ICtkYXRlUmlnaHRTdGFydE9mV2Vlaztcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc1NhbWVXZWVrO1xuIiwiaW1wb3J0IHsgaXNTYW1lV2VlayB9IGZyb20gXCIuL2lzU2FtZVdlZWsubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBpc1RoaXNXZWVrfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgaXNUaGlzV2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgd2VlayBhcyB0aGUgY3VycmVudCBkYXRlP1xuICogQHB1cmUgZmFsc2VcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIHdlZWsgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIGRhdGUgaXMgaW4gdGhpcyB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDI1IFNlcHRlbWJlciAyMDE0LCBpcyAyMSBTZXB0ZW1iZXIgMjAxNCBpbiB0aGlzIHdlZWs/XG4gKiBjb25zdCByZXN1bHQgPSBpc1RoaXNXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAyNSBTZXB0ZW1iZXIgMjAxNCBhbmQgd2VlayBzdGFydHMgd2l0aCBNb25kYXlcbiAqIC8vIGlzIDIxIFNlcHRlbWJlciAyMDE0IGluIHRoaXMgd2Vlaz9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzVGhpc1dlZWsobmV3IERhdGUoMjAxNCwgOCwgMjEpLCB7IHdlZWtTdGFydHNPbjogMSB9KVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNUaGlzV2VlayhkYXRlLCBvcHRpb25zKSB7XG4gIHJldHVybiBpc1NhbWVXZWVrKGRhdGUsIERhdGUubm93KCksIG9wdGlvbnMpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzVGhpc1dlZWs7XG4iLCJpbXBvcnQgeyBpc1NhbWVEYXkgfSBmcm9tIFwiLi9pc1NhbWVEYXkubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgaXNUb2RheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB0b2RheT9cbiAqIEBwdXJlIGZhbHNlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSB0b2RheT9cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBkYXRlIHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMgVGhlIGRhdGUgaXMgdG9kYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQsIGlzIDYgT2N0b2JlciAxNDowMDowMCB0b2RheT9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzVG9kYXkobmV3IERhdGUoMjAxNCwgOSwgNiwgMTQsIDApKVxuICogLy89PiB0cnVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1RvZGF5KGRhdGUpIHtcbiAgcmV0dXJuIGlzU2FtZURheShkYXRlLCBEYXRlLm5vdygpKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc1RvZGF5O1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZEYXlcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIGRheSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIGRheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSBkYXkgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFR1ZSBTZXAgMDIgMjAxNCAwMDowMDowMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZkRheShkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBfZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZEYXk7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBzdGFydE9mV2Vla30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFN1biBBdWcgMzEgMjAxNCAwMDowMDowMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0aGUgd2VlayBzdGFydHMgb24gTW9uZGF5LCB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApLCB7IHdlZWtTdGFydHNPbjogMSB9KVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCB3ZWVrU3RhcnRzT24gPVxuICAgIG9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICAwO1xuXG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkYXkgPSBfZGF0ZS5nZXREYXkoKTtcbiAgY29uc3QgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyA3IDogMCkgKyBkYXkgLSB3ZWVrU3RhcnRzT247XG5cbiAgX2RhdGUuc2V0RGF0ZShfZGF0ZS5nZXREYXRlKCkgLSBkaWZmKTtcbiAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mV2VlaztcbiIsIi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBhcmd1bWVudCAtIFRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKlxuICogQHJldHVybnMgVGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ2xvbmUgdGhlIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUobmV3IERhdGUoMjAxNCwgMSwgMTEsIDExLCAzMCwgMzApKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCB0aGUgdGltZXN0YW1wIHRvIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUoMTM5MjA5ODQzMDAwMClcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQpIHtcbiAgY29uc3QgYXJnU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KTtcblxuICAvLyBDbG9uZSB0aGUgZGF0ZVxuICBpZiAoXG4gICAgYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlIHx8XG4gICAgKHR5cGVvZiBhcmd1bWVudCA9PT0gXCJvYmplY3RcIiAmJiBhcmdTdHIgPT09IFwiW29iamVjdCBEYXRlXVwiKVxuICApIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IGFyZ3VtZW50LmNvbnN0cnVjdG9yKCthcmd1bWVudCk7XG4gIH0gZWxzZSBpZiAoXG4gICAgdHlwZW9mIGFyZ3VtZW50ID09PSBcIm51bWJlclwiIHx8XG4gICAgYXJnU3RyID09PSBcIltvYmplY3QgTnVtYmVyXVwiIHx8XG4gICAgdHlwZW9mIGFyZ3VtZW50ID09PSBcInN0cmluZ1wiIHx8XG4gICAgYXJnU3RyID09PSBcIltvYmplY3QgU3RyaW5nXVwiXG4gICkge1xuICAgIC8vIFRPRE86IENhbiB3ZSBnZXQgcmlkIG9mIGFzP1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gVE9ETzogQ2FuIHdlIGdldCByaWQgb2YgYXM/XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCB0b0RhdGU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBVSSBmcm9tIFwiLi9tb2R1bGVzL1VJXCI7XHJcbnZhciB1aSA9IG5ldyBVSSgpO1xyXG51aS5pbml0KCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==