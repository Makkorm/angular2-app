import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoService {

  todos: Todo[] = [];

  constructor() { }

  updateLocalStorage(){
    localStorage.setItem('Todo[Polishuk-Oleg]', JSON.stringify(this.todos));
  }

  getAllTodos(): Todo[] {
    if (localStorage.getItem('Todo[Polishuk-Oleg]') === null) {
      return []
    } else {
      this.todos =  JSON.parse(localStorage.getItem('Todo[Polishuk-Oleg]'));
    }
    return this.todos
  }

  addTodo( todo: Todo ): TodoService {
    let id  = this.todos.length > 0 ? this.todos[this.todos.length -1].id + 1 : 1;
    let newTodo = todo;

    newTodo.id = id;
    if( !todo.title.trim() ) {
      return
    }

    this.todos.push( newTodo );
    this.updateLocalStorage();

    return this;
  }

  toggleTodoComplete(todo: Todo) {
    for (let i = 0; i < this.todos.length; i++){
      if (this.todos[i] === todo){
        this.todos[i].complete = !this.todos[i].complete;
      }
    }

    localStorage.setItem('Todo[Polishuk-Oleg]', JSON.stringify(this.todos));
  }

  deleteTodo(todo : Todo) {
    let index = this.todos.indexOf(todo);
    let startTodos = this.todos.slice(0, index);
    let endTodos = this.todos.slice(index +1);
    let newTodos = startTodos.concat(endTodos);

    this.todos = newTodos;

    this.updateLocalStorage();
  }

  toggleAll(toggleall){
    this.todos.forEach((todo) => todo.complete = toggleall);

    this.updateLocalStorage();
  }

  allCompleted(){
    let completedTodos = [],
      isAllCompleted;

    for (let i =0; i < this.todos.length; i++) {
      if (this.todos[i].complete === false) {
        completedTodos.push(this.todos[i].complete)
      }
    }

    completedTodos.lastIndexOf(false) === -1 ? isAllCompleted = true: isAllCompleted = false ;
    return isAllCompleted;
  }

  deleteCompleted(){
    this.todos = this.getActive();
    this.updateLocalStorage();
  }

  getActive(){
    let activeTodos = [];

    for (let i =0; i < this.todos.length; i++) {
      if (this.todos[i].complete === false) {
        activeTodos.push(this.todos[i]);
      }
    }
    return activeTodos;
  }

  getCompleted(){
    let completedTodos = [];

    for (let i =0; i < this.todos.length; i++) {
      if (this.todos[i].complete === true) {
        completedTodos.push(this.todos[i])
      }
    }

    return completedTodos;
  }

  getCount(){
    return this.getActive().length;
  }

  edit(todo){
    console.log(this.todos);
    let editTodo = todo,
      index = this.todos.indexOf(todo);

    editTodo.editing = true;
    this.todos[index] = editTodo;
    console.log(this.todos[index]);
    this.updateLocalStorage();
  }

  updateTodoTitle(todo, title){
    let editTodo = todo,
      index = this.todos.indexOf(todo),
      _title = title.value;

    editTodo.editing = false;

    if (_title.trim() === '') {
      editTodo.title = _title;
      this.todos[index] = editTodo;
      this.deleteTodo(todo);
    }
    else {
      editTodo.title = _title;
      this.todos[index] = editTodo;
    }
    this.updateLocalStorage();
  }

  stopEditing(todo){
    let editTodo = todo,
      index = this.todos.indexOf(todo);

    editTodo.editing = false;
    this.todos[index] = editTodo;

    this.updateLocalStorage();
  }

}
