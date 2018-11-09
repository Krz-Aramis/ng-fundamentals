import { Component, OnInit } from '@angular/core';
import { EventService, IEvent, ISession } from '../shared/index' ;
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  templateUrl: 'event-details.component.html',
  styles: [`
    .container { padding-left: 20px; padding-right: 20px; }
    .event-image { height: 100px; }
    a { cursor: pointer }
  `]
})

export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode: boolean = false ;
  filterBy: string = 'all';
  sortBy: string = 'name';

  constructor(private eventService: EventService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach(
      // We loop through the params.
      // as part of the fat function arrow definition, we specify the type of the inputs; here Params
      (params: Params) => {
        // the + sign casts the string 'id' to a number
        // NOTE: if we do not use "subscribe()" the HTTP call would never be made!
        this.eventService.getEvent(+params['id']).subscribe(
          // Here we define a function that is called when the data is returned.
          // This function is responsible for handling/responding to the data
          // 1. The return value from the getEvent method is an object of type IEvent
          //    therefore we cast the return value to the appropriate object type.
          (event: IEvent) => {
            // We associate the data we obtained to the field of this component
            this.event = event ;
            // We only reset the state of this component IF the HTTP call was successful
            this.addMode = false;
          }
        );
      }
    );
  }

  addSession() {
    this.addMode = true ;
  }

  saveNewSession(session: ISession ) {
    // Get the Max ID from the current sessions in this event.
    // Increment before assigning this NEW ID to the given session.
    // Once this is done, push this new session on the array
    const nextId = Math.max.apply(null, this.event.sessions.map(
      s => s.id
    ));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false ;
  }

  cancelAddSession() {
    this.addMode = false ;
  }
}
