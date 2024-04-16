import { Component } from '@angular/core';
import {UsernameAndPassword} from "@app/authentication/models/UsernameAndPassword";
import {AuthService} from "@app/authentication/services/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Logo} from "@app/configurations/globalData";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {

  credentials :UsernameAndPassword = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router , private toastService :ToastService) {}

  logIn(): void {
    this.authService.login(this.credentials).subscribe();
  }

  async navigateTo(route :string) {
    await this.router.navigate([route]);
  }

  protected readonly Logo = Logo;
}
