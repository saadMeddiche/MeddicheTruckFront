import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Token} from "../models/Token";
import {Permissions} from "../../enums/permissions";

export const baseGuard = (auth:AuthService , router :Router ,jwtHelper :JwtHelperService , authority: Permissions) => {

  // Check if the user is logged in
  if(!auth.isLoggedIn()){
    alert("You need to login first")
    router.navigate(['/signin']); // Redirect unauthenticated users
    return false;
  }

  // Get the token from the local storage
  const token = auth.getToken();

  // Check if the token is null
  if(token == null){
    router.navigate(['/signin']) // Redirect unauthenticated users
    console.log("[baseGuard] Token is null");
    return false;
  }

  let requiredPermission = [authority , Permissions.ACCESS_ALL];

  // Check if the user doesn't have the required permission
  if(!requiredPermission.some(permission => auth.hasPermission(permission))){
    alert("You don't have permission to access this page")
    auth.logout();
    return false;
  }

  return true;

}
