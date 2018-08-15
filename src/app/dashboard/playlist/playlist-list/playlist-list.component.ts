import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NavigationService } from '../../../services/navigation.service';


@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {
  list = null;
  constructor(
    private http: HttpClient,
    private nav: NavigationService
  ) { }

  ngOnInit() {
    this.list = this.getList();
    // console.log(this.list.title);
  }
  getList() {
    const url = 'http://localhost:8000/adverts/playlist/';
    this.http.get(url)
      .subscribe(
        data => {
          this.list = data;
          console.log(data);
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            console.log(error.status);
          }
        }
      );
  }
  delete(id: any) {
    const url = 'http://localhost:8000/adverts/playlist/detail/' + id + '/';
    console.log(url);
    this.http.delete(url)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 405) {
              console.log('The Method is not allowed');
            }
          }
        }
      );
    this.nav.goto_playlist();
  }

  show(id: any) {
    console.log(id);
  }

}
