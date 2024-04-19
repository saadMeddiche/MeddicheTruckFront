import {AbstractControl, AbstractControlOptions, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function  noSpaceValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    const value = control.value;

    const noSpace =  value && /\s/.test(value);

    return noSpace ? {noSpace: true} : null;

  }
}

export function passwordValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    const value = control.value;

    const pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/.test(value);

    return !pattern ? {password: true} : null;

  }
}

export function matchValidator(confirmPasswordControlName: string, passwordControlName: string) : ValidatorFn  {
  return (control: AbstractControl) : ValidationErrors | null => {

    const confirmPassword = control.get(confirmPasswordControlName)?.value;

    const password = control.get(passwordControlName)?.value;

    return password !== confirmPassword ? {match: true} : null;

  }
}

export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {

    const value = control.value;

    const pattern = /^\d{4}-\d{2}-\d{2}$/.test(value);

    const date = new Date(value);

    const currentDate = new Date();

    return !pattern || date > currentDate ? {birthDate: true} : null;

  }
}
