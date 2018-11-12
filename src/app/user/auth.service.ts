import {of} from 'rxjs';
import {catchError, tap} from 'rxjs/internal/operators';
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
    return  this.http.post('/api/login', loginInfo, options)
                      .pipe(
                        // this operator allows to act on the incoming observable data.
                        // It is typically meant to create side effects.
                        // Unlinke MAP it DOES NOT modify the observable that is forwarded onto the subscriber.
                        // In other words, tap() does not manipulate what is coming through the observable stream.
                        tap(
                          data => {
                            // IMPORTANT: the implementation below is server specific.
                            // In other words, we are reading the 'user' field and casting to IUser because
                            // the data returned from the server is compatible with this configuration.
                            // Other authentication server will provide the data in different shapes.
                            this.currentUser = <IUser>data['user'];
                            console.log('In tap: ' + this.currentUser);
                          }
                        )
                      )
                      .pipe(catchError(
                        err => {
                          return of(false);
                      } ));
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }
}
