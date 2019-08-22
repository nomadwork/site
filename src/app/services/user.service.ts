import { Injectable } from '@angular/core';
import User from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  register(user: User): Observable<boolean> {
    return of(true);
  }

}
