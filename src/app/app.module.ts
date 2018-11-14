import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ng6-toastr-notifications';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  EventService,
  CreateEventComponent,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  EventResolver
} from './events/index';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { ToastrService,
         CollapsibleWellComponent,
         JQ_TOKEN,
         SimpleModalComponent,
         ModalTriggerDirective
} from './common/index' ;
import { appRoutes } from '../routes';
import { Error404Component } from './error/404.component';
import { AuthService } from './user/auth.service';

// This let's Angular know that there ALREADY is a global object named toastr.
declare let toastr: Toastr;
declare let jQuery: Object;
//declare let jQuery: window['$'];
//let jQuery: window['$'];

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    NavBarComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot()
  ],
  providers: [EventService,
              ToastrService,
              {
                provide: JQ_TOKEN,
                useValue: jQuery
              },
              EventResolver,
              {
                provide: 'canDeactivateCreateEvent',
                useValue: checkDirtyState
              },
              EventListResolver,
              AuthService,
              VoterService
          ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
