export default class Project {
  #title;
  #color;
  #todos;
  constructor(title) {
    this.#title = title;
    this.#color = "carbon";
    this.#todos = [];
  }

  set title(title) {
    this.#title = title;
  }
  get title() {
    return this.#title;
  }

  set color(color) {
    this.#color = color;
  }
  get color() {
    return this.#color;
  }

  set todos(todo) {
    this.#todos.push(todo);
  }
  get todos() {
    return this.#todos;
  }
  
  clearTodos() {
    this.#todos = [];
  }

  deleteTodo(index) {
    this.#todos.splice(index, 1);
  }
}
