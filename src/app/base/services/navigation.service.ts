import {Inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Pages} from "@app/data/pages";
import {ID} from "@app/types/GeneralTypes";
import {Location} from "@angular/common";
@Injectable({
  providedIn: 'root'
})
export abstract class NavigationService {

  protected constructor(protected router: Router,
                        protected location: Location ) {}

  refreshPage(): void {
    window.location.reload();
  }

  async navigateTo(route :string) {
    await this.router.navigate([route]);
  }

  async back() {
    this.location.back();
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

  async navigateToVehicleImages(id: ID) {
    await this.navigateTo(Pages.VEHICLES_IMAGES.replace(':id', id!.toString()));
  }

  async navigateToPersonsList() {
    await this.navigateTo(Pages.PERSONS_LIST);
  }

  async navigateToPiecesList() {
    await this.navigateTo(Pages.PIECES_LIST);
  }

  async navigateToPieceImages(id: ID) {
    await this.navigateTo(Pages.PIECES_IMAGES.replace(':id', id!.toString()));
  }

  async navigateToTransactionsList() {
    await this.navigateTo(Pages.TRANSACTIONS_LIST);
  }

  async navigateToPieceTransactionsList() {
    await this.navigateTo(Pages.PIECE_TRANSACTIONS_LIST);
  }

  async navigateToVehicleTransactionsList() {
    await this.navigateTo(Pages.VEHICLE_TRANSACTIONS_LIST);
  }

  async navigateToProfile() {
    await this.navigateTo(Pages.PROFILE);
  }
}
