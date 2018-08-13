import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import 'rxjs/add/operator/toPromise';

interface ItemResponse {
  user: {
    first_name;
    last_name;
    email;
    id;
    username;
  };
  key: string;
}
// User model classes
export class User {
  username: string;
  password: string;
}
export class Signup {
  //   first_name: string;
  //   last_name: string;
  username: string;
  email: string;
  password1: string;
  password2: string;
}
@Injectable()
export class AuthService {
  public base_url = 'http://localhost:8000';
  public headers: HttpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient) { }

  checkLoggedIn(): boolean {
    // console.log('logged ', localStorage.getItem('token'));
    if (!localStorage.getItem('token') === null) {
      // console.log('logged ', localStorage.getItem('token'));
      return true;
    } else {
      // console.log('check logged in false', localStorage.getItem('token'));
      return false;
    }
  }
  getToken(): string {
    // return JSON.parse(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }
  getName(): string {
    return JSON.parse(localStorage.getItem('user'));
  }
  getId(): string {
    return JSON.parse(localStorage.getItem('id'));
  }
  login(user) {
    const url = `${this.base_url}/rest_auth/login/`;
    return this.http.post<ItemResponse>(url, user, { headers: this.headers });
  }
  signup(signup) {
    const url = `${this.base_url}/rest_auth/regi  public headers: HttpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });
    stration/`;
    return this.http.post(url, signup, { headers: this.headers });
  }
  // registerbusiness(business): Promise<any> {
  //   console.log('Auth:',business);
  //   const url = `${this.base_url}/business/business/`;
  //   return this.http.post(url, business, {headers: this.headers}).toPromise();
  // }
}
