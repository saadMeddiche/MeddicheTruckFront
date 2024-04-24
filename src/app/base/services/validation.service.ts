import { Injectable } from '@angular/core';
import {NavigationService} from "@app/base/services/navigation.service";
import {Router} from "@angular/router";
import {
  getErrorMessageForBirthDate,
  getErrorMessageForEmail, getErrorMessageForFile,
  getErrorMessageForName,
  getErrorMessageForPassword
} from "@app/base/validation/error-messages/error.messages";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export abstract class ValidationService extends NavigationService {

  form: FormGroup;

  abstract buildForm(): FormGroup;

  protected constructor(override router :Router) {
    super(router);
    this.form = this.buildForm();
  }

  protected getErrorName(controlName: string): string {
    return getErrorMessageForName(controlName, this.form);
  }

  protected getErrorEmail(controlName: string): string {
    return getErrorMessageForEmail(controlName, this.form);
  }

  protected getErrorPassword(controlName: string): string {
    return getErrorMessageForPassword(controlName, this.form);
  }

  protected getErrorBirthDate(controlName: string): string {
    return getErrorMessageForBirthDate(controlName, this.form);
  }

  protected getErrorFile(controlName: string): string {
    return getErrorMessageForFile(controlName, this.form);
  }
}
