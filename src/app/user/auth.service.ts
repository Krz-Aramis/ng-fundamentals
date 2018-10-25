import { Injectable } from '@angular/core';
import { IUser } from './user.model';

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor() { }

  loginUser(userName: string, passowrd: string) {
    this.currentUser = {
      id: 1,
      userName: userName,
      firstName: 'John',
      lastName: 'Papa'
    };
  }

  isAuthenticated() {
    return !!this.currentUser;
  }
}
