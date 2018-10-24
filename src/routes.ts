import { Routes } from '@angular/router' ;
import { EventsListComponent} from './app/events/events-list.component' ;
import { EventDetailsComponent} from './app/events/event-details/event-details.component';
import { CreateEventComponent } from './app/events/create-event.component';
import { Error404Component } from './app/error/404.component';
import { EventRouteActivator } from './app/events/event-details/event-route-activator.service';
import { EventListResolver } from './app/events/event-list.resolver.service';

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
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' }
] ;
