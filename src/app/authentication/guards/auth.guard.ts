import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {PopupService} from "../../components/popup/services/popup.service";
import {PopupType} from "../../components/popup/enums/PopupType";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router , private popup : PopupService) {}

  async canActivate(): Promise<boolean> {

    console.log(!this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      this.popup.show(['You need to login first !!'] , PopupType.ERROR);
      await this.router.navigate(['/signin']);
      return false;
    }

    if(!await this.authService.isTokenValid()){
      await this.router.navigate(['/signin']);
      return false;
    }

    console.log(!this.authService.isLoggedIn());

    return true;
  }
}
