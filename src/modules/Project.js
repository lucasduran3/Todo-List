import { v4 as uuidv4 } from "uuid";

export default class Project {
  #id;
  #name;
  #default;
  #tasks;
  #selectedTask;
  #selectedTaskId;

  constructor(name) {
    this.#id = uuidv4();
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
