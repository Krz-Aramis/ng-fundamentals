import { Routes } from '@angular/router' ;
import { EventsListComponent} from './app/events/events-list.component' ;
import { EventDetailsComponent} from './app/events/event-details/event-details.component';

export const appRoutes: Routes = [
  { path: 'events', component: EventsListComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full '}
] ;
