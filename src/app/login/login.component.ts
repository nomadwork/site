import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthGuardService } from '../services/auth-guard.service';
import User from '../models/user';
import { LoginService } from '../services/login.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  step1 = true;
  step2 = false;
  formNewUser = false;
  email = '';
  confirmPassword = false;
  password = '';
  passwordOne: string;
  passwordTwo: string;
  regexEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'i');

  private user: User = new User();

  constructor(private loginService: LoginService, private userService: UserService, private alertService: AlertService) { }


  ngOnInit() {
  }

  validateEmail() {

    if (this.regexEmail.test(this.email)) {
      this.loginService.verifyEmail(this.email)
        .subscribe(() => {
          this.goToStepTwo();
        }, (error) => {
          this.alertService.warning(error.error.msg);
        });
    } else {
      this.alertService.danger('E-mail não está no formato adequado.');
    }
  }

  login() {

    this.loginService.login(this.email, this.password)
      .subscribe(result => {
        console.log(result);
      }, (error) => {
        this.alertService.warning(error.error.msg);
      });
  }

  verifyEmailSubmit() {
    return this.email.length === 0;
  }

  verifyPasswordSubmit() {
    return this.password.length === 0;
  }

  goToStepTwo() {
    this.step1 = false;
    this.step2 = true;
  }

  goStepOne() {
    this.step1 = true;
    this.step2 = false;
  }

  newUser() {
    this.step1 = false;
    this.step2 = false;
    this.formNewUser = true;
  }

  goLogin() {
    this.step1 = true;
    this.step2 = false;
    this.formNewUser = false;
  }

  verifyPassword() {
    return this.passwordOne !== this.passwordTwo;
  }

  forgetPassword() {
    //  Implementar esqueci a senha
  }

  register() {

    this.userService.register(this.user)
      .subscribe(() => {
        this.loginService.login(this.user.email, this.user.password)
          .subscribe(resultUser => {
            console.log(resultUser);
          }, error => console.log(error));
      }, error => {
        console.log(error);
      });
  }

}
