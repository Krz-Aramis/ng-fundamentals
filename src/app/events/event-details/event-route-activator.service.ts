import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { EventService } from '../shared/index';

@Injectable()
export class EventRouteActivator implements CanActivate {
  constructor(private eventService: EventService,
              private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // the double ! converts the ID to a boolean... in other words, a value was given to ID when the route was called.
    const eventExists = !!this.eventService.getEvent(+route.params['id']);

    if (!eventExists) {
      this.router.navigate(['/404']);
    }

    return eventExists;
  }
}
