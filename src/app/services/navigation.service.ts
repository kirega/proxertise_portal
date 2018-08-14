import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class NavigationService {
  constructor(private router: Router) {}

  goto_index() {
    this.router.navigate(['/dashboard']);
  }
  goto_login() {
    this.router.navigate(['/login']);
  }
  goto_signup() {
    this.router.navigate(['/login']);
  }
  goto_adlist() {
    this.router.navigate(['/dashboard/adverts']);
   }
}
