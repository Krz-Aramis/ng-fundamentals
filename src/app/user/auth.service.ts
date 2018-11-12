import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/internal/operators';

import { IUser } from './user.model';
import { ApplicationJsonHttpHeaders } from '../common/application-json.http-headers';

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private http: HttpClient) { }

  loginUser(userName: string, password: string) {
    // the shape of the object below is dependent on the desing
    // of the server. In this case, the back-end uses Passport
    // which defines the object with all lowercase keys.
    const loginInfo = {username: userName, password: password };
    return  this.http.post('/api/login', loginInfo, ApplicationJsonHttpHeaders)
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
    return this.http.put(`/api/users/${this.currentUser.id}`,
                          // this property on this component matches the expectations set by the HTTP server
                          this.currentUser,
                          ApplicationJsonHttpHeaders);
  }

  logout() {
    this.currentUser = undefined;
    // This call and composition is again server implementation dependent.
    // Observe that here we do not supply any user information. There is no ID for the server to use.
    // The authors expect the server code to work out who is logged in and log them out accordingly.
    // In other implementation, the body of the request could include key user information.
    return this.http.post('/api/logout', {}, ApplicationJsonHttpHeaders);
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    this.http.get('/api/currentIdentity')
             .pipe(tap(
              // The authors argue that this approach is more flexible.
              // Indeed if the caller(s) needed to take an action based on the data supplied by the HTTP Server
              // then all that is required would be to return the observable and have the callers subscribe.
              // We would also need to remove the call to subscribe below.
              // It really all depends if the consummers are doing anything, or making any decision
              // based on the return data.
              data => {
                // In this implementation, the server returns null if the current user is not authenticated.
                // Otherwise it returns the current user as an object
                if (data instanceof Object) {
                  this.currentUser = <IUser>data;
                }
              }
            ))
            .subscribe();
  }
}
