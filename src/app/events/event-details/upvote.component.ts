import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'upvote',
  templateUrl: 'upvote.component.html',
  styleUrls: ['upvote.component.css']
})

export class UpvoteComponent implements OnInit {
  @Input() count: number = 0;
  // We use an input set to create a derived property on a component.
  // This is an alternative technique to using the OnChange interface.
  // It would have achieved the same as everytime the state of the component
  // is altered the ngOnChange function would have been called.
  // This, arguably, is more succint.
  @Input() set voted(val) {
    this.iconColour = val ? 'red' : 'white' ;
  }
  @Output() vote = new EventEmitter();
  iconColour: string ;
  constructor() { }

  ngOnInit() { }

  onClick() {
    this.vote.emit({});
  }
}
