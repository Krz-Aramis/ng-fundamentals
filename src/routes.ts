import { Routes } from '@angular/router' ;

import { Error404Component } from './app/error/404.component';

import {
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  CreateSessionComponent
} from './app/events/index';

export const appRoutes: Routes = [
  { path: 'events/new', component: CreateEventComponent, canDeactivate: [ 'canDeactivateCreateEvent'] },
  // When calling this route, call EventListResolver. When the resolver completes, create an anonymous object
  // and create a property 'events' on it, for which the data is the output from the resolver.
  // This object and thus its public properties are then passed down to the angular component to be consummed.
  { path: 'events', component: EventsListComponent, resolve:
    {
      events: EventListResolver
    }
  },
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] },
  { path: 'events/session/new', component: CreateSessionComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  // Before the hash is the location and name of the file to read
  // After the hash is the module to load as part of this route.
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' }
] ;
