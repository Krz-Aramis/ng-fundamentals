import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  styles: [`
  em { float: right ; color: #E05C65; padding-left: 10px; }
  `
  ]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  mouseoverLogin: boolean;
  loginInvalid: boolean  = false ;

  constructor(
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit() { }

  login(formValues) {
    this.authService.loginUser(formValues.userName, formValues.password)
                    .subscribe(
                      resp => {
                        if (!resp) {
                          // we got a false, meaning that the log in was invalid
                          this.loginInvalid = true ;
                        } else {
                          // console.log(formValues);
                          this.router.navigate(['events']);
                        }
                      }
                    );
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
