import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "@app/authentication/services/authentication/auth.service";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {Pages} from "@app/configurations/pages";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router , private toastService : ToastService) {}

  async canActivate(): Promise<boolean> {

    if (!this.authService.isLoggedIn()) {
      this.toastService.pushToToaster('You are not logged in', ToastType.WARNING);
      await this.router.navigate([Pages.LOG_IN]);
      return false;
    }

    if(!await this.authService.isTokenValid()){
      this.toastService.pushToToaster('Token expired, please re-login', ToastType.WARNING);
      await this.router.navigate([Pages.LOG_IN]);
      return false;
    }

    return true;
  }
}
