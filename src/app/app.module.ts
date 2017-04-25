import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FocusModule } from 'angular2-focus';
import { PopupModule } from 'ng2-opd-popup';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoService } from './todo.service';
import { StatePipe } from './state.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent,
    StatePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PopupModule.forRoot(),
    FocusModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: TodoListComponent,
        pathMatch: 'full',
        data : {title: 'all'}
      },
      {
        path: 'active',
        component: TodoListComponent,
        data: {title: 'active'}
      },
      {
        path: 'completed',
        component: TodoListComponent,
        data: {title: 'completed'}
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
