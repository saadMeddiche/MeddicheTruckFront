import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
import { MenuItem } from '../models/MenuItem';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuItems: MenuItem[] = [
    {
      name: 'Login', route: '/signin', isVisible: () => !this.auth.isLoggedIn()
    },
    {
      name: 'Register', route: '/signup', isVisible: () => !this.auth.isLoggedIn()
    },
    {
      name: 'U-Dashboard', route: '/userDashboard', isVisible: () => this.auth.isLoggedIn()
        && (this.auth.haveUserDashboardAccess() || this.auth.haveAccessAll())
    }
  ];

  title = 'MeddicheTruck';
  icon = 'assets/logo.png';

  constructor(private router: Router, public auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }

  isLogoutVisible(): boolean {
    return this.auth.isLoggedIn();
  }

}
