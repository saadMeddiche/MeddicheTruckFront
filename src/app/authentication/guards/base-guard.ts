import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Permissions} from "@app/enums/permissions";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {Pages} from "@app/configurations/pages";

export const baseGuard = async (auth:AuthService , router :Router ,jwtHelper :JwtHelperService , authority: Permissions ,toastService: ToastService) => {

  // Check if the user is logged in
  if(!auth.isLoggedIn()){
    toastService.pushToToaster('You need to login first !!', ToastType.DANGER);
    await router.navigate([Pages.LOG_IN]); // Redirect unauthenticated users
    return false;
  }

  // Get the token from the local storage
  const token = auth.getToken();

  // Check if the token is null
  if(token == null){
    await router.navigate([Pages.LOG_IN]); // Redirect unauthenticated users
    console.log("[baseGuard] Token is null");
    return false;
  }

  let requiredPermission = [authority , Permissions.ACCESS_ALL];

  // Check if the user doesn't have the required permission
  if(!requiredPermission.some(permission => auth.hasPermission(permission))){
    toastService.pushToToaster('You don\'t have the required permission !!', ToastType.DANGER);
    auth.logout();
    return false;
  }

  return true;

}
