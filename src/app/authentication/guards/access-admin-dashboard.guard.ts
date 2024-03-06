import {CanActivate, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {baseGuard} from "./base-guard";


@Injectable({
  providedIn: 'root'
})
export class AccessAdminDashboardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router , private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    return baseGuard(this.authService , this.router , this.jwtHelper , 'ACCESS_ADMIN_DASHBOARD')
  }
}
