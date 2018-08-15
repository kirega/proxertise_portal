import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NavigationService } from './navigation.service';

@Injectable()
export class UtilsService {
    constructor(
        private http: HttpClient,
        // private nav: NavigationService
    ) {}

    getList(url) {
        this.http.get(url)
        .subscribe(
            (data) => {
                console.log(data);
                return data;

            },
            (error) => {
                if ( error instanceof HttpErrorResponse) {
                    // if (error.status === 401) {
                    //     this.nav.goto_login();
                    // }
                    console.log('Unable to get resources');
                }
                return null;
            }
        )

    }

}
