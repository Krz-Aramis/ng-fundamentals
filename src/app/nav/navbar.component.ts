import {ISession, EventService} from '../events/shared/index';
import { Component, OnInit } from '@angular/core';

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

  constructor(private auth: AuthService,
              private eventService: EventService) { }

  ngOnInit() { }

  searchSessions(searchTerm: string) {
    this.eventService.searchSessions(searchTerm).subscribe(
      // returns observable which is an array of ISession, therefore for each of these array assign them to our local variable
      sessions => {
        this.foundSessions = sessions ;
      }
    );
  }
}
