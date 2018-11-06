import {EventService} from './shared/event.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'create-event.component.html',
  styles: [`
    form { margin-top: 10px; }
    label { display: block; }
    .form-group { margin-top: 5px; }
    em {color:#E05C65; padding-left:10px;}
    .error input {background-color:#E3C3C5;}
  `]
})

export class CreateEventComponent implements OnInit {
  newEvent: any;
  isDirty: boolean = true ;

  constructor(private router: Router,
              private eventService: EventService ) { }

  ngOnInit() { }

  saveEvent(formValue) {
    console.log(formValue);
    this.eventService.saveEvent(formValue);
    this.isDirty = false;
    this.router.navigate(['/events']);
  }
  cancel() {
    this.router.navigate(['/events']);
  }
}
