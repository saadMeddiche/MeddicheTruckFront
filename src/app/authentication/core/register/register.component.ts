import {Component, OnInit} from '@angular/core';
import {UserInformations} from "@app/authentication/models/UserInformations";
import {AuthService} from "@app/authentication/services/authentication/auth.service";
import {Router} from "@angular/router";
import {Logo} from "@app/configurations/globalData";
import {NavigationService} from "@app/services/navigation.service";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {
  birthDateValidator,
  matchValidator,
  noSpaceValidator,
  passwordValidator
} from "@app/base/validation/costum-validators/costum.validators";
import {
  getErrorMessageForBirthDate,
  getErrorMessageForEmail,
  getErrorMessageForName,
  getErrorMessageForPassword
} from "@app/base/validation/error-messages/error.messages";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends NavigationService  {

  registrationForm: FormGroup;

  user : UserInformations = {
    username :'',
    firstName :'',
    middleName :'',
    lastName :'',
    email :'',
    password :'',
    birthDate :''
  };

  constructor(private auth :AuthService , override router :Router , private toastService :ToastService){
    super(router);
    this.registrationForm = this.buildForm();
  }

  buildForm() {
    return new FormGroup({
      username: new FormControl('', [
        Validators.required,
        noSpaceValidator()
      ]),
      firstName: new FormControl('', [
        Validators.required,
        noSpaceValidator()
      ]),
      middleName: new FormControl('', [
        noSpaceValidator()
      ]),
      lastName: new FormControl('', [
        Validators.required,
        noSpaceValidator()
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      birthDate: new FormControl('', [
        Validators.required,
        birthDateValidator()
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        passwordValidator()
      ]),
      confirmPassword: new FormControl('', [
        Validators.required ,
        Validators.minLength(8),
        passwordValidator()
      ])

      },

      {
       validators: matchValidator('confirmPassword', 'password')
      }

    );
  }

  register(): void {
    if(this.registrationForm.invalid) {
      alert('Please fill all the required fields');
      return;
    }

    this.user = this.registrationForm.value;

    this.auth.register(this.user).subscribe();
  }

  protected readonly Logo  = Logo;
  protected getErrorName(controlName: string): string {
    return getErrorMessageForName(controlName, this.registrationForm);
  }

  protected getErrorEmail(controlName: string): string {
    return getErrorMessageForEmail(controlName, this.registrationForm);
  }

  protected getErrorPassword(controlName: string): string {
    return getErrorMessageForPassword(controlName, this.registrationForm);
  }

  protected getErrorBirthDate(controlName: string): string {
    return getErrorMessageForBirthDate(controlName, this.registrationForm);
  }

}
