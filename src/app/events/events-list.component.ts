import { Component, OnInit } from '@angular/core' ;
import { EventService } from './shared/event.service' ;
import { ToastrService } from '../common/toastr.service';

@Component({
  templateUrl : './events-list.component.html'
})
export class EventsListComponent implements OnInit {

  events: any[] ;

  constructor(private eventService: EventService, private toastrService: ToastrService ) { }

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }

  handleThumbnailClick(name: string) {
    this.toastrService.success(name, 'Selected Event Name:') ;
  }
}
