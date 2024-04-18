import {Component} from '@angular/core';
import {UserInformations} from "@app/authentication/models/UserInformations";
import {AuthService} from "@app/authentication/services/authentication/auth.service";
import {Router} from "@angular/router";
import {Logo} from "@app/configurations/globalData";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {
  birthDateValidator,
  matchValidator,
  noSpaceValidator,
  passwordValidator
} from "@app/base/validation/costum-validators/costum.validators";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {ValidationService} from "@app/base/services/validation.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends ValidationService {

  protected readonly Logo  = Logo;

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
  }

  register(): void {

    if(this.form.invalid) {
      this.toastService.pushToToaster('Validation failed', ToastType.DANGER);
      return;
    }

    this.user = this.form.value;


    this.auth.register(this.user).subscribe();
  }

  override buildForm() {
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



}
