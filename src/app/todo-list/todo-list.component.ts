import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { Popup } from 'ng2-opd-popup';


import { Todo } from '../Todo';
import { TodoService } from '../todo.service';
import { UUID } from 'angular2-uuid';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  route: any;
  stateParams: string;
  logAppStart: any;
  baseUrl: string;
  shareUrl: string;

  constructor( private todoService: TodoService, route: ActivatedRoute, private popup:Popup, platformLocation: PlatformLocation ) {
    this.todos = [];
    this.route = route;
    this.stateParams = '';
    this.logAppStart = platformLocation;
    this.baseUrl = this.logAppStart.location.href;
    this.shareUrl = '';

    this.popup.options = {
      header: "Share URL",
      color: "#cc9a9a",
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "OK", // The text on your confirm button
      cancleBtnContent: "Ok", // the text on your cancel button
      confirmBtnClass: "hide", // your class for styling the confirm button
      cancleBtnClass: "popup-btn", // you class for styling the cancel button
      animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };
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

  showPopUp(){
    let currentState = this.todos,
        id = UUID.UUID(),
        shareUrl = this.baseUrl + 'share/'+ id;

    this.shareUrl = shareUrl;
    this.popup.show(this.popup.options);

    this.todoService.putCurrentState(currentState, id);
  }

}
