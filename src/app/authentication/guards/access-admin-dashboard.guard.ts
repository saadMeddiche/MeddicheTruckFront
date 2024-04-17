import {CanActivate, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "@app/authentication/services/authentication/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {baseGuard} from "@app/authentication/guards/base-guard";
import {Permissions} from "@app/enums/permissions";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {TokenService} from "@app/authentication/services/token/token.service";


@Injectable({
  providedIn: 'root'
})
export class AccessAdminDashboardGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router ,
              private jwtHelper: JwtHelperService,
              private toastService: ToastService,
              private token : TokenService) {}

  async canActivate(): Promise<boolean> {
    return await baseGuard(
      this.authService ,
      this.router ,
      this.jwtHelper ,
      Permissions.ACCESS_ADMIN_DASHBOARD ,
      this.toastService,
      this.token);
  }
}
