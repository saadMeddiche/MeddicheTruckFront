import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/authentication/services/auth.service';
import { MenuItem } from '@app/layouts/navbar/models/MenuItem';
import {languages} from "@app/layouts/navbar/languages";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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
      name: 'Profile', route: '/?profile', isVisible: () => true
    },
    {
      name: 'Dashboard', route: '/userDashboard', isVisible: () => this.auth.isLoggedIn()
        && (this.auth.haveUserDashboardAccess() || this.auth.haveAccessAll())
    }
  ];
  title = 'MeddicheTruck';
  icon = 'assets/logo.png';

  constructor(private router: Router, public auth: AuthService,private sanitizer: DomSanitizer) {}

  logout(): void {
    this.auth.logout();
  }

  isLogoutVisible(): boolean {
    return this.auth.isLoggedIn();
  }

  sanitizeSVG(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  protected readonly languages = languages;

}
