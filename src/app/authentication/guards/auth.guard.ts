import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "@app/authentication/services/authentication/auth.service";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {Pages} from "@app/data/pages";
import {NavigationService} from "@app/base/services/navigation.service";
import {TokenService} from "@app/authentication/services/token/token.service";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends NavigationService implements CanActivate {
  constructor(private authService: AuthService,
              override router: Router ,
              private toastService : ToastService,
              private token: TokenService,
              override location: Location ) {
    super(router, location);
  }

  async canActivate(): Promise<boolean> {

    if (!this.authService.isLoggedIn()) {
      this.toastService.pushToToaster('You are not logged in', ToastType.WARNING);
      await this.router.navigate([Pages.LOG_IN]);
      return false;
    }

    if(!await this.token.isValid()){

      this.toastService.pushToToaster('Token expired, please re-login', ToastType.WARNING);
      await this.authService.logout()
      return false;
    }

    return true;
  }
}
