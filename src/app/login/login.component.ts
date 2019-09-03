import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import User from '../models/user';
import { LoginService } from '../services/login.service';
import { AlertService } from 'ngx-alerts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../utils/must-match';
import { trigger, state, style, animate, transition } from '@angular/animations';

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

  defaultImage = 'http://localhost:3000/files/nomadworkbg-lq.jpg';
  image = 'http://localhost:3000/files/nomadworkbg.jpg';

  loading = false;
  show = true;
  step = true;
  formNewUser = false;
  email = '';
  confirmPassword = false;
  password = '';
  passwordOne: string;
  passwordTwo: string;
  regexEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'i');

  private user: User = new User();

  // Variavel para manipular o form no ngOnInit
  formRegister: FormGroup;

  constructor(private loginService: LoginService, private userService: UserService,
    private alertService: AlertService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    // Acessando todos os campos do formulario e adicionando validação
    this.formRegister = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      passwordRepeat: [null, [Validators.required]],
      date: [null, Validators.required],
      gender: ['female'],
    }, {
        validator: MustMatch('password', 'passwordRepeat')
      });

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
        .subscribe(() => {
          this.goToStepTwo();
        }, (error) => {
          this.alertService.warning(error.error.msg);
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
      .subscribe(result => {
        console.log(result);
        this.loading = false;
      }, (error) => {
        this.alertService.warning(error.error.msg);
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
    this.loading = false;
    this.show = false;
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

  forgetPassword() {
    //  Implementar esqueci a senha
  }

  // metodo ao clicar no botão registrar
  registerSubmit() {

    const value = this.formRegister.value;
    value.password = window.btoa(value.password);
    delete value.passwordRepeat;

    this.loginService.register(value)
      .subscribe((resultUser) => {
        this.formRegister.reset();
        this.show = false;
        this.step = true;
        this.formNewUser = false;
        this.email = resultUser.email;
        this.alertService.success('Cadastro realizado com sucesso');
      }, (error: any) => {
        this.alertService.warning(error.error.msg);
      });
  }
}
