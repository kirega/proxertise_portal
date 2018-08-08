import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { Signup, AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error = false;
  signupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private nav: NavigationService) { }

  ngOnInit() {
    this.createForm();
    // localStorage.clear();
  }
  createForm() {
    this.signupForm = this.fb.group({
      username: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required, Validators.email
      ]],
      password1: ['', [
        Validators.required
      ]],
      password2: ['', [
        Validators.required
      ]]
    }
    );
  }
  post_data(formdata: Signup) {
    this.auth.signup(formdata)
      .subscribe(
        (data) => {
          console.log(data);
          // this.nav.goto_login();
        },
        (err: any ) => {
          this.nav.goto_signup();
          this.error = true;
          // console.log(err);
        }
      );
  }
}
