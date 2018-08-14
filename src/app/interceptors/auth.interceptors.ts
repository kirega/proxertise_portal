import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler, HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/do';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  tokenHeader: string;
  // constructor(private auth: AuthService, private nav: NavigationService) {}
  constructor(private inj: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const authReq = req;

    const auth = this.inj.get(AuthService);
    const nav = this.inj.get(NavigationService);
    const token = auth.getToken();
    this.tokenHeader = `Token ${token}`;

    if (auth.checkLoggedIn() === true) {
      req = req.clone({
        setHeaders: {
          Authorization: this.tokenHeader
        }
      });
    }
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
              if (error.status === 401) {
                console.log('failed');
                nav.goto_login();
              }
            }
          }
        ),
      );
  }
}

