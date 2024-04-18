import {FormGroup} from "@angular/forms";

export function  getErrorMessageForName(controlName: string , form: FormGroup): string {

  const control = form.get(controlName);

  if (control?.hasError('required')) {
    return 'This field is required.';
  }

  if (control?.hasError('noSpace')) {
    return 'Spaces are not allowed.';
  }

  return '';
}

export function getErrorMessageForEmail(controlName: string , form: FormGroup): string {

  const control = form.get(controlName);

  if (control?.hasError('required')) {
    return 'This field is required.';
  }

  if (control?.hasError('email')) {
    return 'Invalid email address.';
  }

  return '';
}

export function getErrorMessageForPassword(controlName: string , form: FormGroup): string {

    const control = form.get(controlName);

    if (control?.hasError('required')) {
      return 'This field is required.';
    }

    if (control?.hasError('minlength')) {
      return 'Password must be at least 8 characters long.';
    }

    if (control?.hasError('password')) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.';
    }

    if (form?.errors?.['match']) {
      return 'Passwords do not match.';
    }

    return '';
}

export function getErrorMessageForBirthDate(controlName: string , form: FormGroup): string {

  const control = form.get(controlName);

  if (control?.hasError('required')) {
    return 'This field is required.';
  }

  if (control?.hasError('birthDate')) {
    return 'Invalid birth date:\n -Date must be in the past.';
  }

  return '';
}

