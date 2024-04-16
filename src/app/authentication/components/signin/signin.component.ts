import {Component} from '@angular/core';
import {UsernameAndPassword} from "../../models/UsernameAndPassword";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
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
