import { Component, Input } from '@angular/core' ;

@Component({
  selector: 'event-thumbnail',
  templateUrl : './event-thumbnail.component.html',
  styles: [`
    .green { color: #003300 !important; }
    .bold { font-weight: bold; }
    .pad-left { margin-left: 10px ; }
    .well div{ color: #bbb; }
    .thumbnail { min-height: 210px; }
    `]
})
export class EventThumbnailComponent {
  @Input() input_event: any ;

  getStartTimeClass() {
    const isEarlyStart = this.input_event && this.input_event.time === '8:00 am';
    return {green: isEarlyStart , bold: isEarlyStart };
  }
  getStartTimeStyle(): any {
    // To be used with the [ngStyle] binding on the appropriate HTML element of the template.
    if (this.input_event && this.input_event.time === '8:00 am') {
      return { color: '#003300', 'font-weight': 'bold'} ;
    }
    return {} ;
  }
}
