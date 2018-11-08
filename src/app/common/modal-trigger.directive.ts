import { Directive, OnInit, Inject, ElementRef } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Directive({ selector: '[modal-trigger]' })
export class ModalTriggerDirective implements OnInit {
  private el: HTMLElement;

  // ref refers to the DOM element on which this directive applies.
  constructor(ref: ElementRef,
              @Inject(JQ_TOKEN) private $: any) {
                this.el = ref.nativeElement;
              }

  ngOnInit() {
    // When this component is instanciated, we programmatically add an click event listener.
    this.el.addEventListener('click', e => {
      // This ID is defined in the simple-modal component (HTML)
      // jQuery will find it and show it on screen.
      this.$('#simple-modal').modal({});
    });
  }
}
