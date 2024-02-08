import { v4 as uuidv4 } from "uuid";

export default class Task {
  #id;
  #name;
  #dueDate;
  #priority;
  #complete;

  constructor(name, dueDate, priority) {
    this.#id = uuidv4();
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
