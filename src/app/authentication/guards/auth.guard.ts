import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {PopupService} from "@app/layouts/popup/services/popup.service";
import {ToastType} from "@app/layouts/toast/enums/ToastType";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router , private popup : PopupService) {}

  async canActivate(): Promise<boolean> {

    if (!this.authService.isLoggedIn()) {
      this.popup.show(['You need to login first !!'] , ToastType.DANGER);
      await this.router.navigate(['/signin']);
      return false;
    }

    if(!await this.authService.isTokenValid()){
      await this.router.navigate(['/signin']);
      return false;
    }

    return true;
  }
}
