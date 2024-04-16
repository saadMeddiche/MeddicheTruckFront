import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Permissions} from "../../enums/permissions";
import {PopupService} from "@app/layouts/popup/services/popup.service";
import {ToastType} from "@app/layouts/toast/enums/ToastType";

export const baseGuard = (auth:AuthService , router :Router ,jwtHelper :JwtHelperService , authority: Permissions ,popUp: PopupService) => {

  // Check if the user is logged in
  if(!auth.isLoggedIn()){
    popUp.show(['You need to login first'], ToastType.DANGER);
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
    popUp.show(['You don\'t have permission to access this page'], ToastType.WARNING);
    auth.logout();
    return false;
  }

  return true;

}
