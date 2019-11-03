import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  markers() {
    return this.http.get<any>('/api/markers');
  }

  login(email: string, passwordSimple: string): Observable<any> {
    const password = window.btoa(passwordSimple);
    return this.http.post<any>('/api/user/login', { email, password })
      .pipe(
        map(resultApi => {
          this.userService.user = resultApi.result.user;
          localStorage.setItem('user',  JSON.stringify(this.userService.user));
          localStorage.setItem('token', resultApi.result.token.accessToken);
          this.loggedIn.next(true);
          this.router.navigate(['/']);
          return true;
        })
      );
  }

  set isLogged(flag: boolean) {
    this.loggedIn.next(flag);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>('/api/user/create', user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  verifyEmail(email: string): Observable<any> {
    return this.http.get<any>(`/api/user/${email}`);
  }

}
