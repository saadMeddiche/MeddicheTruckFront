import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Token} from "../models/Token";

export const baseGuard = (auth:AuthService , router :Router ,jwtHelper :JwtHelperService , authority:string) => {

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

  // Decode the token to get its payload
  const decodedToken :Token = jwtHelper.decodeToken(token) as Token;

  let permissions = decodedToken.authorities;

  let requiredPermission = [authority , 'ACCESS_ALL'];

  // Check if the user doesn't have the required permission
  if(!decodedToken || !decodedToken.authorities || !requiredPermission.some(permission => permissions.includes(permission))){
    alert("You don't have permission to access this page")
    localStorage.removeItem('token');
    router.navigate(['/signin']); // Redirect unauthorized users
    return false;
  }

  return true;

}
