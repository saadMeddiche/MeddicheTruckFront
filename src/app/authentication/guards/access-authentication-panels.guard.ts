import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AccessAuthenticationPanelsGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
     if( this.authService.isLoggedIn()){
       alert("You are already logged in");
       return false;
     }

      return true;
  }
}
