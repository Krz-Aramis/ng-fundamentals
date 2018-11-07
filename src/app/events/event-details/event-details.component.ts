import { Component, OnInit } from '@angular/core';
import { EventService, IEvent, ISession } from '../shared/index' ;
import { ActivatedRoute } from '@angular/router';

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

  constructor(private eventService: EventService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.eventService.getEvent(
      // the + sign casts the string 'id' to a number
      +this.route.snapshot.params['id']);
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
