import { Component, OnInit } from '@angular/core';
// import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
              // private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit() { }

  login(formValues) {
    // this.authService.loginUser(formValues.userName, formValues.password);
    console.log(formValues);
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
