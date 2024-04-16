import {Component} from '@angular/core';
import {UsernameAndPassword} from "@app/authentication/models/UsernameAndPassword";
import {AuthService} from "@app/authentication/services/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "@app/layouts/toast/services/toast.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})

export class SigninComponent {

  credentials :UsernameAndPassword = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router , private toastService :ToastService) {}

  signin(): void {
    this.authService.login(this.credentials).subscribe();
  }
}
