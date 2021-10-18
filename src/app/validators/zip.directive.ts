import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function zipValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validated = /\d{6}/i.test(control.value);
    return validated ? null : { notValidated: { value: control.value } };
  };
}
