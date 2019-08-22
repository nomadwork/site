import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthGuardService } from '../services/auth-guard.service';
import User from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  step1 = true;
  step2 = false;
  formNewUser = false;
  formValidateText = '';
  email: string;
  confirmPassword = false;
  password;
  passwordOne: string;
  passwordTwo: string;

  private user: User = new User();

  constructor(private loginService: LoginService, private userService: UserService) { }


  ngOnInit() {
  }

  validateEmail() {
    if (!this.email) {
      this.formValidateText = "Digite um e-mail";
    } else {
      this.loginService.verifyEmail(this.email)
        .subscribe(() => {
          this.goToStepTwo();
        }, () => {
          this.formValidateText = 'E-mail não cadastrado na cohuub';
        });
    }
  }


  login() {

    if (!this.password) {
      this.formValidateText = 'Digite uma senha';
    } else {
      this.loginService.login(this.email, this.password)
        .subscribe(result => {
          console.log(result);
        }, () => {
          this.formValidateText = 'Senha incorreta';
        });
    }

  }

  goToStepTwo() {
    this.step1 = false;
    this.step2 = true;
    this.formValidateText = '';
  }

  goStepOne() {
    this.step1 = true;
    this.step2 = false;
    this.formValidateText = '';
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
