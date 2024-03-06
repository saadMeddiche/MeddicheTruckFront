import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../authentication/services/auth.service";
import {MenuItem} from "../models/MenuItem";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router , private auth: AuthService) {
  }
  menuItems: MenuItem[] = [
    { name: 'Login', route: '/signin' },
    { name: 'Register', route: '/signup'},
    { name: 'U-Dashboard', route: '/userDashboard' },
    { name: 'A-Dashboard', route: '/adminDashboard'},
  ];

  title = 'MeddicheTruck';
  icon = 'assets/logo.png';

  logout(): void {
    this.auth.logout();
  }
}


