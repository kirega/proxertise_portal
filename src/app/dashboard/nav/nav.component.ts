import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  username: string;
  constructor() { }
  ngOnInit() {
    // this.get_username();
    this.username = localStorage.getItem('user');
  }

  get_username() {
  }

}
