import {Component} from '@angular/core';
import {UsernameAndPassword} from "../../models/UsernameAndPassword";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {PopupService} from "@app/layouts/popup/services/popup.service";
import {PopupType} from "@app/layouts/popup/enums/PopupType";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})

export class SigninComponent {

  credentials :UsernameAndPassword = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router , private popup:PopupService) {}

  signin(): void {
    this.authService.login(this.credentials).subscribe();
  }
}
