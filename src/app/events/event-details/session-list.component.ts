import { Component, OnInit, Input, Output } from '@angular/core';
import { ISession } from '../shared/index';

@Component({
  selector: 'session-list',
  templateUrl: 'session-list.component.html'
})

export class SessionListComponent implements OnInit {

  @Input() sessions: ISession[] ;
  constructor() { }

  ngOnInit() { }


}
