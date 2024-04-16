import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {Pages} from "@app/configurations/pages";

@Injectable({
  providedIn: 'root'
})
export abstract class NavigationService {

  protected constructor(protected router: Router) {}

  async navigateTo(route :string) {
    await this.router.navigate([route]);
  }

  async navigateToHome() {
    await this.navigateTo(Pages.HOME);
  }

  async navigateToLogin() {
    await this.navigateTo(Pages.LOG_IN);
  }

  async navigateToRegister() {
    await this.navigateTo(Pages.REGISTER);
  }

  async navigateToUserDashboard() {
    await this.navigateTo(Pages.USER_DASHBOARD);
  }
}
