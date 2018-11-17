import { InjectionToken } from '@angular/core';

export let JQ_TOKEN = new InjectionToken<Object>('jQuery');

export function jQueryFactory() {
  return window['$'];
}

export const JQUERY_PROVIDER = [
  { provide: JQ_TOKEN, useFactory: jQueryFactory },
];

// tslint:disable-next-line:class-name
export class jQuery { }
