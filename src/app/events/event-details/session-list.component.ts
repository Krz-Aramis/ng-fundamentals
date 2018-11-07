import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ISession, sortByNameAsc, sortByVotesDesc } from '../shared/index';

@Component({
  selector: 'session-list',
  templateUrl: 'session-list.component.html'
})

export class SessionListComponent implements OnInit, OnChanges {

  @Input() sessions: ISession[] ;
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSessions: ISession[] = [] ;

  constructor() { }

  ngOnInit() { }

  // this function is triggered whenever the Input properties
  // of this component change.
  ngOnChanges() {
    if (this.sessions) {
      // we will not filter on empty data
      this.filterSessions(this.filterBy);
      'name' === this.sortBy ? this.visibleSessions.sort(sortByNameAsc)
                             : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  filterSessions(filter: string) {
    if ('all' === filter) {
      // We do not want to point to all of the session array.
      // Rather we required a fresh new copy which we achieve using the slice method.
      this.visibleSessions = this.sessions.slice(0);
    } else {
      // Every element that returns true will be added to this brand new array.
      this.visibleSessions = this.sessions.filter(
        // for each session in the sessions array
        session => {
          // return elements whose level match the given filter
          return session.level.toLocaleLowerCase() === filter ;
        }
      );
    }
  }
}
