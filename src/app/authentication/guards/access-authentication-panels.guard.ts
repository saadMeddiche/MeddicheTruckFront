import {CanActivate} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";
import {PopupService} from "@app/layouts/popup/services/popup.service";
import {PopupType} from "@app/layouts/popup/enums/PopupType";

@Injectable({
  providedIn: 'root'
})
export class AccessAuthenticationPanelsGuard implements CanActivate {
  constructor(private authService: AuthService,
              private popUp: PopupService) {}

  canActivate(): boolean {
     if(this.authService.isLoggedIn()){
       this.popUp.show(['You are already logged in'], PopupType.WARNING);
       return false;
     }

      return true;
  }
}
