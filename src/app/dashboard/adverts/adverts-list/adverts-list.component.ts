import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-adverts-list',
  templateUrl: './adverts-list.component.html',
  styleUrls: ['./adverts-list.component.css']
})
export class AdvertsListComponent implements OnInit {
  list ;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    const url = 'http://localhost:8000/adverts/list/';
    this.http.get(url)
    .subscribe(
      data => {
        this.list = data;
        // console.log(data);
      },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error.status);
        }
      }
    );
  }

}
