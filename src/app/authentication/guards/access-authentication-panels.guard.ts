import {CanActivate} from "@angular/router";
import {AuthService} from "@app/authentication/services/authentication/auth.service";
import {Injectable} from "@angular/core";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {ToastService} from "@app/layouts/toast/services/toast.service";

@Injectable({
  providedIn: 'root'
})
export class AccessAuthenticationPanelsGuard implements CanActivate {
  constructor(private authService: AuthService,
              private toastService: ToastService) {}

  canActivate(): boolean {
     if(this.authService.isLoggedIn()){
       this.toastService.pushToToaster('You are already logged in', ToastType.WARNING);
       return false;
     }

      return true;
  }
}
