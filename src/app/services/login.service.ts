import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  private loggedIn = new BehaviorSubject<boolean>(true);

  get isLoggedIn() {

    //Se o usuário tiver logado emit um true aqui;
    this.loggedIn.next(true);
    this.userService.user = { name: 'Nomad', email: 'nomadwork@gmail.com' }
    if (localStorage.getItem('token')) {
    }

    return this.loggedIn.asObservable();
  }

  markers() {
    return this.http.get<any>('/api/markers');
  }

  login(email: string, password: string): Observable<any> {
    // const passwordEncode = window.btoa(password);
    return this.http.post<any>('/api/user/login', { email, password })
      .pipe(
        map(result => {
          this.userService.user = result;
          localStorage.setItem('token', result.result.token.accessToken);
          this.loggedIn.next(true);
          this.router.navigate(['/']);
          return result;
        }, e => console.log(e))
      );
  }

  register(user: User): Observable<any> {
    return this.http.post<any>('/api/register', user);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  verifyEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>('/api/user/' + email).pipe(map(data => {
      return data;
    }))
  }

}
