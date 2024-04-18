import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/authentication/services/authentication/auth.service';
import { NavbarLink } from '@app/layouts/navbar/models/navbarLink';
import {languages} from "@app/data/languages";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Logo} from "@app/configurations/globalData";
import {ILogo} from "@app/interfaces/ILogo";
import {NavigationService} from "@app/services/navigation.service";
import {LanguageService} from "@app/services/language.service";
import {ILanguage} from "@app/interfaces/ILanguage";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends NavigationService{

  selectedLanguage :ILanguage | null = null;

  constructor(override router: Router,
              public auth: AuthService,
              private sanitizer: DomSanitizer,
              private languageService: LanguageService){
    super(router);

  }

  ngOnInit(): void {
    this.selectedLanguage = this.languageService.getLanguage();
  }

  navbarLinks: NavbarLink[] = [
    {
      name: 'Login',
      function: () => this.navigateToLogin(),
      isVisible: () => !this.auth.isLoggedIn()
    },
    {
      name: 'Register',
      function: () => this.navigateToRegister(),
      isVisible: () => !this.auth.isLoggedIn()
    },
    {
      name: 'Profile',
      function: () => this.navigateTo('/?profile'),
      isVisible: () => this.auth.isLoggedIn()
    },
    {
      name: 'Dashboard',
      function: () => this.navigateToUserDashboard(),
      isVisible: () => this.auth.isLoggedIn() && this.auth.haveUserDashboardAccess()
    },
    {
      name: 'Logout',
      function: () => this.auth.logout(),
      isVisible: () => this.auth.isLoggedIn()
    }
  ];

  sanitizeSVG(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  protected readonly languages = languages;
  protected readonly Logo :ILogo = Logo;

}
