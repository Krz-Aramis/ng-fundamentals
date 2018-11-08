import { InjectionToken } from '@angular/core';

// Note that TOASTR_TOKEN is NOT a string but a JavaScript object.
// This is useful for dependencies injection as it ensures
// that either the same object is re-used, or that a distinct
// object is (depending on need).
// In Angular, when provided through the dependency injector
// such objects are often singleton. By avoiding using
// string, we avoid possible collisions!
export let TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');

export interface Toastr {
  success(msg: string, title?: string): void;
  info(msg: string, title?: string): void;
  warning(msg: string, title?: string): void;
  error(msg: string, title?: string): void;
}
