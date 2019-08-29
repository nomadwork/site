import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import User from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  user: User;

  constructor(private loginService: LoginService, private userService: UserService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
    this.user = this.userService.user;
  }

  logout() {
    this.loginService.logout();
  }

}
