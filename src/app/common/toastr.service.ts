import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class ToastrService {

  private defaultOptions = {
    toastTimeout: 4500, // default 5000
    newestOnTop: true,
    showCloseButton: true,
    animate: 'slideFromBottom'
  };

  constructor (private toastrManager: ToastrManager ) { }

  success(msg: string, title?: string) {
    this.toastrManager.successToastr(msg, title, this.defaultOptions);
  }

  info(msg: string, title?: string) {
    this.toastrManager.infoToastr(msg, title, this.defaultOptions);
  }

  warning(msg: string, title?: string) {
    this.toastrManager.warningToastr(msg, title, this.defaultOptions);
  }

  error(msg: string, title?: string) {
    this.toastrManager.errorToastr(msg, title, this.defaultOptions);
  }

}
