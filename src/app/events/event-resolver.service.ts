import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { EventService } from './shared/index';

@Injectable()
export class EventResolver implements Resolve<any> {
  constructor(private eventService: EventService) { }

  resolve(route: ActivatedRouteSnapshot) {
    // We use the route and its associated parameters to look-up the data that we need.
    // 'id' is keyword defined in the ROUTE where this resolver applies.
    return this.eventService.getEvent(+route.params['id']);
  }

}
