import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/authentication/services/auth.service';
import { NavbarLink } from '@app/layouts/navbar/models/navbarLink';
import {languages} from "@app/layouts/navbar/data/languages";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Pages} from "@app/configurations/pages";
import {Logo} from "@app/configurations/globalData";
import {ILogo} from "@app/interfaces/ILogo";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  navbarLinks: NavbarLink[] = [
    {
      name: 'Login',
      function: () => this.navigateTo(Pages.LOG_IN),
      isVisible: () => !this.auth.isLoggedIn()
    },
    {
      name: 'Register',
      function: () => this.navigateTo(Pages.REGISTER),
      isVisible: () => !this.auth.isLoggedIn()
    },
    {
      name: 'Profile',
      function: () => this.navigateTo('/?profile'),
      isVisible: () => true
    },
    {
      name: 'Dashboard',
      function: () => this.navigateTo(Pages.USER_DASHBOARD),
      isVisible: () => this.auth.isLoggedIn() && this.auth.haveUserDashboardAccess()
    },
    {
      name: 'Logout',
      function: () => this.auth.logout(),
      isVisible: () => this.auth.isLoggedIn()
    }
  ];

  constructor(private router: Router, public auth: AuthService,private sanitizer: DomSanitizer) {}

  sanitizeSVG(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  async navigateTo(route: string): Promise<void> {
    await this.router.navigate([route]);
  }

  protected readonly languages = languages;
  protected readonly Logo :ILogo = Logo;

}
