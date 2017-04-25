import {Component, OnInit, DoCheck} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Todo } from '../Todo';
import { TodoService } from '../todo.service';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  route: any;
  stateParams: string;

  constructor( private todoService: TodoService, route: ActivatedRoute ) {
    this.todos = [];
    this.route = route;
    this.stateParams = '';
  }

  ngOnInit() {
    this.todos = this.todoService.getAllTodos();
    this.stateParams = this.route.routeConfig.data.title;
  }

  addTodo(todo){
    this.todoService.addTodo(todo);
    this.todos = this.todoService.getAllTodos();
  }

  deleteTodo(todo) {
    this.todoService.deleteTodo(todo);
    this.todos = this.todoService.getAllTodos();
  }

  toggleTodoComplete(todo){
    this.todoService.toggleTodoComplete(todo);
    this.todos = this.todoService.getAllTodos();
  }

  toggleAll(toggleall){
    this.todoService.toggleAll(toggleall)
  }

  allCompleted() {
    return this.todoService.allCompleted();
  }

  deleteCompleted(){
    this.todoService.deleteCompleted();
    this.todos = this.todoService.getAllTodos();
  }

  getCompleted(){
    return this.todoService.getCompleted().length > 0;
  }

  getCount(){
    return this.todoService.getCount();
  }

  edit(todo){
    this.todoService.edit(todo);
  }

  updateTitle(todo, newValue){
    this.todoService.updateTodoTitle(todo, newValue);
    this.todos = this.todoService.getAllTodos();
  }

  stopEditing(todo){
    this.todoService.stopEditing(todo);
  }

}
