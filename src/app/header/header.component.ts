import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  user: User;

  constructor(private loginService: LoginService, private userService: UserService, private alertService: AlertService) { }

  async ngOnInit() {
    this.isLoggedIn$ = await this.loginService.isLoggedIn;
    this.user = await this.userService.user;
    this.alertService.info(`Bem vindo ${this.user.name}`)
  }

  logout() {
    this.loginService.logout();
  }

}
