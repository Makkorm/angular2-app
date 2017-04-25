import { Component, Output, EventEmitter } from '@angular/core';

import { Todo } from '../Todo';

@Component({
  moduleId: module.id,
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {

  newTodo: Todo = new Todo();

  @Output() update = new EventEmitter();

  constructor() {}


  addTodo() {
    this.update.emit(this.newTodo);
    this.newTodo.title = '';
  }

}
