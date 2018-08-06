import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

// import 'rxjs/add/operator/toPromise';

interface itemresponse {
  user: {
    first_name;
    last_name;
    email;
    id;
    username;
  }
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
  email: string;
  password: string
}
@Injectable()
export class AuthService {
  public base_url= 'http://localhost:8000';
  public headers: HttpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor( private http: HttpClient) {}

  getToken(): string {
    return JSON.parse(localStorage.getItem('token'));
  }
  getName(): string {
    return JSON.parse(localStorage.getItem('user'));
  }
  getId(): string {
    return JSON.parse(localStorage.getItem('id'));
  }
  login(user) {
    const url = `${this.base_url}/rest_auth/login/`;
    return this.http.post<itemresponse>(url, user, {headers: this.headers});
  }
  signup(signup) {
    const url = `${this.base_url}/users/users/`;
    return this.http.post(url, signup, {headers: this.headers});
  }
  // registerbusiness(business): Promise<any> {
  //   console.log('Auth:',business);
  //   const url = `${this.base_url}/business/business/`;
  //   return this.http.post(url, business, {headers: this.headers}).toPromise();
  // }
}