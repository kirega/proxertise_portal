import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NavigationService } from './navigation.service';
import { Observable } from 'rxjs';


@Injectable()
export class UtilsService {
    public url = 'http://localhost:8000/';
    constructor(
        private http: HttpClient,
        // private nav: NavigationService
    ) {}

    getList(url): Observable<any> {
        return this.http.get(url);
        // .subscribe(
        //     (data) => {
        //         console.log(data);
        //         return data;

        //     },
        //     (error) => {
        //         if ( error instanceof HttpErrorResponse) {
        //             // if (error.status === 401) {
        //             //     this.nav.goto_login();
        //             // }
        //             console.log('Unable to get resources');
        //         }
        //         return null;
        //     }
        // )

    }
    postList(url, data): Observable<any> {
        return this.http.post(url, data);
    }
}
