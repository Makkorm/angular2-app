import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';

import { TodoService } from '../todo.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  logAppStart: any;

  constructor(platformLocation: PlatformLocation, private router: Router,  private todoService: TodoService) {
    this.logAppStart = platformLocation;
  }

  ngOnInit() {
    let path = this.logAppStart.pathname,
      parsedId = path.split('/')[2]; // id

    this.todoService.setState(parsedId);
    this.router.navigate(['']);
  }

}
