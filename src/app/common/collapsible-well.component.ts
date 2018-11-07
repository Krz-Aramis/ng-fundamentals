import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'collapsible-well',
  templateUrl: 'collapsible-well.component.html'
})
export class CollapsibleWellComponent implements OnInit {
  @Input() title: string ;
  visible: boolean = false ;

  constructor() { }

  ngOnInit() { }

  toggleContent() {
    this.visible = !this.visible;
  }
}
