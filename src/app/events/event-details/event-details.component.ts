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
        // Now that we are using a resolver, the data that we required is already present
        // event before this component is instanciated.
        // Therefore instead of calling AGAIN to the HTTP server, we simply load the data directly from the snapshot
        // NOTE: the 'events' keyword correspond to the property on the object we created as part of the route resolver.
          this.event = this.route.snapshot.data['event'];
          this.addMode = false;
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
