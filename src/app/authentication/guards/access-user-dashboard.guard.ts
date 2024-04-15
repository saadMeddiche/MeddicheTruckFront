import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {baseGuard} from "./base-guard";
import {Permissions} from "../../enums/permissions";
import {PopupService} from "@app/layouts/popup/services/popup.service";


@Injectable({
  providedIn: 'root'
})
export class AccessUserDashboardGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private jwtHelper: JwtHelperService,
              private popUp: PopupService) {}

  canActivate(): boolean {
    return baseGuard(this.authService , this.router , this.jwtHelper , Permissions.ACCESS_USER_DASHBOARD , this.popUp);
  }
}
