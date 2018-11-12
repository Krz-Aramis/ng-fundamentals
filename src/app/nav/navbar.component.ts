import { Component, OnInit } from '@angular/core';

import {ISession, EventService, IEvent} from '../events/shared/index';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
    .nav.navbar-nav { font-size: 15px; }
    #searchForm { margin-right: 100px ; }
    @media (max-width: 1200px) { #searchForm { display: none; }}
    li > a.active { color: #F97024; }
  `]
})

export class NavBarComponent implements OnInit {
  searchTerm: string = '';
  foundSessions: ISession[];
  displayedEvents: IEvent[];

  constructor(private auth: AuthService,
              private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      (events:IEvent[]) => {
        this.displayedEvents = events;
      }
    );
  }

  searchSessions(searchTerm: string) {
    this.eventService.searchSessions(searchTerm).subscribe(
      // returns observable which is an array of ISession, therefore for each of these array assign them to our local variable
      sessions => {
        this.foundSessions = sessions ;
      }
    );
  }
}
