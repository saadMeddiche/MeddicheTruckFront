import { Component } from '@angular/core';
import {UsernameAndPassword} from "@app/authentication/models/UsernameAndPassword";
import {AuthService} from "@app/authentication/services/authentication/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Logo} from "@app/data/logo";
import {ValidationService} from "@app/base/services/validation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {noSpaceValidator, passwordValidator} from "@app/base/validation/costum-validators/costum.validators";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent extends ValidationService{

  credentials :UsernameAndPassword = { username: '', password: '' };

  protected readonly Logo = Logo;

  constructor(private authService: AuthService, override router: Router , private toastService :ToastService) {
    super(router);
  }

  logIn(): void {
    this.credentials = this.form.value;
    this.authService.login(this.credentials).subscribe();
  }

  override buildForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', [
        Validators.required,
        noSpaceValidator()
      ]),
      password: new FormControl('', [
        Validators.required,
        passwordValidator()
      ])
    });
  }


}
