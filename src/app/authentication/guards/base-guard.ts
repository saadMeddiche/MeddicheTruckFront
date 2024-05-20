import {AuthService} from "@app/authentication/services/authentication/auth.service";
import {Permissions} from "@app/enums/permissions";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {ToastType} from "@app/layouts/toast/enums/ToastType";

export const baseGuard = async (auth:AuthService ,
                                authority: Permissions ,
                                toastService: ToastService) => {


  let requiredPermission = [authority , Permissions.ACCESS_ALL];

  // Check if the user doesn't have the required permission
  if(!requiredPermission.some(permission => auth.hasPermission(permission))){
    toastService.pushToToaster('You don\'t have the required permission !!', ToastType.DANGER);
    await auth.logout();
    return false;
  }

  return true;

}
