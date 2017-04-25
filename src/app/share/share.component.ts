import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { TodoService } from '../todo.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  logAppStart: any;
  route: any;

  constructor(platformLocation: PlatformLocation, private router: Router,  private todoService: TodoService, route: ActivatedRoute) {
    this.logAppStart = platformLocation;
    this.route = route;
  }

  ngOnInit() {
    let parsedId = this.route.params.value.id; // id

    this.todoService.setState(parsedId);
    this.router.navigate([''],);
  }

}
