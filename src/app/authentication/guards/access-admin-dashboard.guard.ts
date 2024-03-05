import {CanActivate, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AccessAdminDashboardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router , private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const token = this.authService.getToken();

      // Check if the token is null
      if(token == null){
        this.router.navigate(['/signin']); // Redirect unauthenticated users
        console.log("Token is null");
        return false;
      }

      // Decode the token to get its payload
      const decodedToken = this.jwtHelper.decodeToken(token);


      console.log("Dashboard Admin: \n");
      console.log(decodedToken);
      // Check if the user has the required permission
      if (decodedToken && decodedToken.authorities &&
        (decodedToken.authorities.includes('ACCESS_ADMIN_DASHBOARD') || decodedToken.authorities.includes('ACCESS_ALL')) ) {
        return true;
      } else {
        alert("You don't have permission to access this page")
        localStorage.removeItem('token');
        this.router.navigate(['/signin']); // Redirect unauthorized users
        return false;
      }

    } else {
      alert("You need to login first")
      this.router.navigate(['/signin']); // Redirect unauthenticated users
      return false;
    }
  }
}
