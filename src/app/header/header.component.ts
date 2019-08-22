import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
  }

  logout() {
    this.loginService.logout();
  }

}
