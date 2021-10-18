import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function onlyLettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validated = /^[a-zA-Z]+$/.test(control.value);
    return validated ? null : { notValidated: { value: control.value } };
  };
}
