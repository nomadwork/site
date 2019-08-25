import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {

    //Se o usuário tiver logado emit um true aqui;
    this.loggedIn.next(false);
    if (localStorage.getItem('token')) {
    }

    return this.loggedIn.asObservable();
  }


  login(user: string, password: string): Observable<any> {
    return this.http.post<any>('/api/login', { user, password })
      .pipe(
        map(result => {
          localStorage.setItem('token', result.token);
          this.loggedIn.next(true);
          this.router.navigate(['/']);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  verifyEmail(username: string): Observable<boolean> {
    return of(true);
  }

}
