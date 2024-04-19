import {Inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Pages} from "@app/data/pages";

@Injectable({
  providedIn: 'root'
})
export abstract class NavigationService {

  protected constructor(protected router: Router) {}

  refreshPage(): void {
    window.location.reload();
  }

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

  async navigateToVehiclesList() {
    await this.navigateTo(Pages.VEHICLES_LIST);
  }

  async navigateToPersonsList() {
    await this.navigateTo(Pages.PERSONS_LIST);
  }

  async navigateToPiecesList() {
    await this.navigateTo(Pages.PIECES_LIST);
  }

  async navigateToTransactionsList() {
    await this.navigateTo(Pages.TRANSACTIONS_LIST);
  }
}
