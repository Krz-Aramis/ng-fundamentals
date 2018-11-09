import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { EventService } from './shared/index';

@Injectable()
export class EventListResolver implements Resolve<any> {
  constructor(private eventService: EventService) { }

  resolve() {
    // We do not use subscribe() because we need to return the observable back to Angular and
    // the component that displays the data.
    // Remember that Resolvers AUTOMATICALLY subscribe to observables!
    return this.eventService.getEvents();
  }

}
