import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventService } from './shared/event.service';

@Injectable()
export class EventListResolver implements Resolve<any> {
  constructor(private eventService: EventService) { }

  resolve() {
    // We do not use subscribe() because we need to return the observable back to Angular and
    // the component that displays the data.
    // To this end, we use pipe and then map the observable back to an observable that is then
    // pass back to the component/angular.
    return this.eventService.getEvents().pipe(
      map(
        events => events
      )
    );
  }

}
