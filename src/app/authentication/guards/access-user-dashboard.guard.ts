import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "@app/authentication/services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {baseGuard} from "./base-guard";
import {Permissions} from "@app/enums/permissions";
import {ToastService} from "@app/layouts/toast/services/toast.service";


@Injectable({
  providedIn: 'root'
})
export class AccessUserDashboardGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private jwtHelper: JwtHelperService,
              private toastService: ToastService) {}

  async canActivate(): Promise<boolean> {
    return await baseGuard(this.authService , this.router , this.jwtHelper , Permissions.ACCESS_USER_DASHBOARD , this.toastService);
  }
}
