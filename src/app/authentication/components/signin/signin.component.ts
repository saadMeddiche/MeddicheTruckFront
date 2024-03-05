import { Component } from '@angular/core';
import {UsernameAndPassword} from "../../models/UsernameAndPassword";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  credentials :UsernameAndPassword = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  signin(): void {

    this.authService.login(this.credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/userDashboard']);
      },
      (error) => {
        console.log('Login failed', error);
      }
    );

  }
}
