import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { userRoutes } from './user.routes';
import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // As this is a lazy loaded module, we are not allowed to
    // import the BrowserModule
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    ProfileComponent,
    LoginComponent
  ],
  providers: [
    // We do not put the AuthService here
    // because we will need it in other part of the application.
    // Providers are shared across ALL modules of a given application,
    // hence why placing the AuthService in the app module is enough.
    // This rule DOES NOT apply to imports and declarations!
  ],
})
export class UserModule { }

