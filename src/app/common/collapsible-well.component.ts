import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'collapsible-well',
  templateUrl: 'collapsible-well.component.html'
})
export class CollapsibleWellComponent implements OnInit {
  visible: boolean = true ;

  constructor() { }

  ngOnInit() { }

  toggleContent() {
    this.visible = !this.visible;
  }
}
