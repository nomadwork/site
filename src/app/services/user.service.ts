import { Injectable } from '@angular/core';
import User from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userIsLogged: User;

  constructor() { }

  register(user: User): Observable<boolean> {
    return of(true);
  }

  get user(): User {
    return this.userIsLogged;
  }

  set user(user: User) {
    this.userIsLogged = user;
  }

}
