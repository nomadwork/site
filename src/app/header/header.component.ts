import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { AlertService } from 'ngx-alerts';
import { MatDialog } from '@angular/material/dialog';
import { DialogEstablishmentsComponent } from '../shared/dialog-establishments/dialog-establishments.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  user: User;

  constructor(private loginService: LoginService, private userService: UserService,
              private matDialog: MatDialog) { }

  async ngOnInit() {
    this.isLoggedIn$ = await this.loginService.isLoggedIn;
    this.user = this.userService.user;
  }

  showEstablishments() {
    this.matDialog.open(DialogEstablishmentsComponent, {
      width: '90%',
      height: '90%',
      data: this.user.establishmments
    });
  }

  logout() {
    this.loginService.logout();
  }

}
