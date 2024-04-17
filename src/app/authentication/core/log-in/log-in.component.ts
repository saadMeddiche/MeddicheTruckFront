import { Component } from '@angular/core';
import {UsernameAndPassword} from "@app/authentication/models/UsernameAndPassword";
import {AuthService} from "@app/authentication/services/authentication/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Logo} from "@app/configurations/globalData";
import {NavigationService} from "@app/base/services/navigation.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent extends NavigationService{

  credentials :UsernameAndPassword = { username: '', password: '' };

  constructor(private authService: AuthService, override router: Router , private toastService :ToastService) {
    super(router);
  }

  logIn(): void {
    this.authService.login(this.credentials).subscribe();
  }


  protected readonly Logo = Logo;
}
