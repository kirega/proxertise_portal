import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler, HttpRequest,
    HttpErrorResponse,
    HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/do';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // constructor(private auth: AuthService, private nav: NavigationService) {}
    constructor(private inj: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const authReq = req;

        const auth = this.inj.get( AuthService);
        const nav = this.inj.get( NavigationService);

        if (auth.checkLoggedIn()) {
            const token = auth.getToken();
            req.clone({
                setHeaders: {
                    'Content-type' : `application/json`,
                    Authorization: `Token ${token}`
                }
            });
            return next.handle(req)
            .pipe(
                tap(
                    (event: HttpEvent<any>) => {
                       if (event instanceof HttpResponse) {
                           console.log('Success');
                       }
                    },
                    (error: any) => {
                        if (error instanceof HttpErrorResponse) {
                            // if (error.status === 401 || error.status === 400 ) {
                                console.log('failed');
                                // this.nav.goto_login();
                            // }
                        }
                    }
                ),
            );
        } else {
            return next.handle(req);
        }
        // .do((event: HttpEvent<any>) => {
        //     if (event instanceof HttpResponse) {
        //     }
        //   },
        //   (err: any) => {
        //     if (err instanceof HttpErrorResponse) {
        //       if (err.status === 401) {
        //         nav.goto_login();
        //       }
        //     }
        //   }
        // );
    }

}