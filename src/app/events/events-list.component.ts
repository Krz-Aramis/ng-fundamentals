import { Component, OnInit } from '@angular/core' ;
import { EventService, IEvent } from './shared/index' ;
import { ToastrService } from '../common/toastr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl : './events-list.component.html'
})
export class EventsListComponent implements OnInit {

  events: IEvent[] ;

  constructor(private eventService: EventService,
              private toastrService: ToastrService,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    // NOTE: the 'events' keyword correspond to the property on the object we created as part of the route resolver.
    this.events = this.route.snapshot.data['events'];
  }

  handleThumbnailClick(name: string) {
    this.toastrService.success(name, 'Selected Event Name:') ;
  }
}
