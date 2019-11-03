import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { LoginService } from '../services/login.service';
import { AlertService } from 'ngx-alerts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../utils/must-match';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('dash', [
      state('hide', style({
        transform: 'translatex(-375px)',
      })),
      state('show', style({
        transform: 'translatex(0px)',
      })),
      transition('hide <=> show', animate('500ms cubic-bezier(0.165, 0.84, 0.44, 1)')),
    ])
  ]
})
export class LoginComponent implements OnInit {

  defaultImage = '../../assets/img/nomadworkbg-lq2.jpg';
  image = '../../assets/img/nomadworkbg.jpg';

  loading = false;
  show = true;
  step = true;
  formNewUser = false;
  email = '';
  confirmPassword = false;

  @ViewChild('loginEmail', { static: false }) emailField: ElementRef;

  password = '';
  passwordOne: string;
  passwordTwo: string;
  regexEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'i');

  private user: User = new User();

  // Variavel para manipular o form no ngOnInit
  formRegister: FormGroup;

  constructor(private loginService: LoginService, private userService: UserService,
    private alertService: AlertService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    // Acessando todos os campos do formulario e adicionando validação
    this.formRegister = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      passwordRepeat: [null, [Validators.required]],
      dateborn: [null, Validators.required],
      gender: ['female'],
    }, {
      validator: MustMatch('password', 'passwordRepeat')
    });

    const user = localStorage.getItem('user');

    if (user) {
      this.loginService.isLogged = true;
      this.userService.user = JSON.parse(user);
      this.router.navigate(['/']);
    }


  }

  // metodo para animação
  get stateStep() {
    return this.show ? 'show' : 'hide';
  }
  toggle() {
    this.show = !this.show;
  }

  validateEmail() {
    this.loading = true;

    if (this.regexEmail.test(this.email)) {
      this.loginService.verifyEmail(this.email)
        .subscribe((resultApi) => {
          if (resultApi.result) {
            this.goToStepTwo();
          }
        }, (error) => {
          this.alertService.warning(error.error.message);
          this.loading = false;
        });
    } else {
      this.alertService.danger('E-mail não está no formato adequado.');
      this.loading = false;
    }
  }

  login() {
    this.loading = true;
    this.loginService.login(this.email, this.password)
      .subscribe(() => {
        this.loading = false;
      }, (error) => {
        if (error.error && error.error.message) {
          this.alertService.warning(error.error.message);
        }
        this.loading = false;
      });
  }

  verifyEmailSubmit() {

    return this.email.length === 0;
  }

  verifyPasswordSubmit() {
    return this.password.length === 0;
  }

  goToStepTwo() {
    this.emailField.nativeElement.blur();
    this.show = false;
    this.loading = false;
  }

  goStepOne() {
    this.show = true;
  }

  newUser() {
    this.step = false;
    this.formNewUser = true;
  }

  goLogin() {
    this.step = true;
    this.formNewUser = false;
  }

  verifyPassword() {
    return this.passwordOne !== this.passwordTwo;
  }

  registerSubmit() {

    const value = this.formRegister.value;
    value.password = window.btoa(value.password);
    value.gender = +value.gender;

    if (typeof value.dateborn === 'object') {
      const dates = value.dateborn.toISOString().split('T')[0].split('-');
      value.dateborn = `${dates[2]}/${dates[1]}/${dates[0]}`;
    }

    delete value.passwordRepeat;

    this.loginService.register(value)
      .subscribe((resultUser) => {
        this.formRegister.reset();
        this.show = false;
        this.userService.user = resultUser.result.user;
        localStorage.setItem('user', JSON.stringify(resultUser.result.user));
        localStorage.setItem('token', resultUser.result.token.accessToken);
        this.loginService.isLogged = true;
        this.router.navigate(['/']);
        this.alertService.success('Cadastro realizado com sucesso');
      }, (error: any) => {
        this.alertService.warning(error.error.message);
      });
  }
}
