import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { IUser } from './user.model';

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private http: HttpClient) { }

  loginUser(userName: string, password: string) {
    // the shape of the object below is dependent on the desing
    // of the server. In this case, the back-end uses Passport
    // which defines the object with all lowercase keys.
    let loginInfo = {username: userName, password: password };
    let options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }
      )
    };
    this.http.post('/api/login', loginInfo, options);
    this.currentUser = {
      id: 1,
      userName: userName,
      firstName: 'John',
      lastName: 'Papa'
    };
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }
}
