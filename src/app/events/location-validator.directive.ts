import { Directive } from '@angular/core';
import { Validator, FormGroup, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive(
  {
    selector: '[validateLocation]',
    // Becasue we use the 'multi' keyword, we DO NOT over-ride the list of built-in Angular Validators.
    // We, in fact, append this validator to the list.
    providers: [{
      provide: NG_VALIDATORS,
      useExisting: LocationValidator,
      multi: true
    }]
  }
)
export class LocationValidator implements Validator {
  constructor() { }
  validate(formGroup: FormGroup): { [key: string]: any } {
    // Here we cannot access the control using the dot notation as Angular is not going to recognise this.
    // Therefore, we have to use the indexer by name instead.
    let addressControl = formGroup.controls['address'];
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];
    // This control is sibbling, therefore we need to move up one level.
    // In order to get access the controls property we need to cast the 'root' properly.
    // The correct cast is only possible by understanding the HTML layout of the form.
    let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

    if ((this.isControlValid(addressControl) &&
         this.isControlValid(cityControl)    &&
         this.isControlValid(countryControl)
        ) ||
        (this.isControlValid(onlineUrlControl))) {
          // All the required fields are populated.
          return null;
        } else {
          return {validateLocation: false} ;
        }
  }

  isControlValid(c: AbstractControl): boolean {
    return c && c.value ;
  }
}
