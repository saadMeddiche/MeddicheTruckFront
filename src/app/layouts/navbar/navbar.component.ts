import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuItems: MenuItem[] = [
    { name: 'Login', route: '/signin' },
    { name: 'Register', route: '/signup'},
    { name: 'U-Dashboard', route: '/userDashboard' },
    { name: 'A-Dashboard', route: '/adminDashboard'}
  ];

  title = 'MeddicheTruck';
  icon = 'assets/logo.png';
}

interface MenuItem {
  name: string;
  route: string;
}
