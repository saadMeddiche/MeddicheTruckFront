import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BACKEND_API } from '../../../configurations/api';
import { UserInformations } from '../../models/UserInformations';
import { UsernameAndPassword } from '../../models/UsernameAndPassword';
import { Token } from '../../models/Token';
import { Permissions } from '../../../enums/permissions';
import {isPlatformBrowser} from "@angular/common";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {TokenService} from "@app/authentication/services/token/token.service";
import {NavigationService} from "@app/base/services/navigation.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends NavigationService{

  constructor(
    private http: HttpClient,
    override router: Router,
    private token :TokenService,
    private toastService: ToastService,
    // ?????????????????
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super(router);
  }

  login(credentials: UsernameAndPassword): Observable<any> {
    return this.http.post<any>(`${BACKEND_API}/authentication/signIn`, credentials).pipe(
      map(async response => {

        // Check if the response or the token is not provided
        if (!response || !response.token) {
          this.toastService.pushToToaster('Error Server: Token or response not provided', ToastType.DANGER);
          return response;
        }

        // Set the token
        this.token.set(response.token);

        // Notify the user
        this.toastService.pushToToaster('You are now logged in', ToastType.SUCCESS);

        // Navigate to the user dashboard
        await this.navigateToUserDashboard()

        return response;
      }),
      catchError(httpErrorResponse => {
        this.toastService.pushToToaster(httpErrorResponse.error, ToastType.DANGER);
        return of(null);
      })
    );
  }
  register(user: UserInformations): Observable<any> {
    return this.http.post<any>(`${BACKEND_API}/authentication/signUp`, user).pipe(
      map(response => {

        // Check if the response or the token is not provided
        if (!response || !response.token) {
          this.toastService.pushToToaster('Error Server: Token or response not provided', ToastType.DANGER);
          return response;
        }

        // Set the token
        this.token.set(response.token);

        // Notify the user
        this.toastService.pushToToaster('You are now registered and auto-logged in', ToastType.SUCCESS);

        return response;
      }),
      catchError(httpErrorResponse => {
        this.toastService.pushToToaster(httpErrorResponse.error, ToastType.DANGER);
        return of(null);
      })
    );
  }
  async logout(): Promise<void>{
    this.token.remove();
    await this.navigateToLogin()
    this.toastService.pushToToaster('You are now logged out', ToastType.SUCCESS);
  }

  hasPermission(permission: Permissions): boolean {
    const decodedToken = this.token.getDetails();
    return decodedToken && decodedToken.authorities ? decodedToken.authorities.includes(permission) : false;
  }

  haveUserDashboardAccess(): boolean {
    return this.hasPermission(Permissions.ACCESS_USER_DASHBOARD);
  }

  haveAccessAll(): boolean {
    return this.hasPermission(Permissions.ACCESS_ALL);
  }

  isLoggedIn(): boolean {
    return !!this.token.get();
  }
}
