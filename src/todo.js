export default class Todo {
  #title;
  #description;
  #dueDate;
  #isDone;
  #project;

  constructor(title) {
    this.#title = title;
    this.#isDone = false;
  }

  set title(title) {
    this.#title = title;
  }
  get title() {
    return this.#title;
  }

  set description(description) {
    this.#description = description;
  }
  get description() {
    return this.#description;
  }

  set dueDate(date) {
    this.#dueDate = date;
  }
  get dueDate() {
    return this.#dueDate;
  }

  set isDone(isDone) {
    this.#isDone = isDone;
  }
  get isDone() {
    return this.#isDone;
  }

  set project(projetc) {
    this.#project = projetc;
  }
  get project() {
    return this.#project;
  }
}
