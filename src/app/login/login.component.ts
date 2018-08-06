import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = false;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private nav:NavigationService
              ) {}

  ngOnInit() {
    localStorage.clear()
    this.createform()
  }

  login(formdata) {
    // console.log(formdata);
    this.auth.login(formdata)
      .subscribe(
        data => {
          localStorage.setItem('token', data.key);
          localStorage.setItem('user', data.user.username);
          localStorage.setItem('id', data.user.id);
          this.nav.goto_index();
        },
        err => {
          this.nav.goto_login();
          this.error = true;
          console.log(err);
        }
      )
  }
  createform() {
    this.loginForm = this.fb.group({
        username: ['',
          [Validators.required]
        ],
        password: ['',
          [Validators.required]
        ]
      }
    )
  }
}
