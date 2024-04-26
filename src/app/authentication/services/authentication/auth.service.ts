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
import {isPlatformBrowser, Location} from "@angular/common";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {TokenService} from "@app/authentication/services/token/token.service";
import {NavigationService} from "@app/base/services/navigation.service";
import {UserService} from "@app/authentication/services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends NavigationService{

  constructor(
    private http: HttpClient,
    override router: Router,
    private token :TokenService,
    private toastService: ToastService,
    private userService: UserService,
    // ?????????????????
    @Inject(PLATFORM_ID) private platformId: Object,
    override location: Location
  ) {
    super(router, location);
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

        // Set the username
        this.userService.setUserName(credentials.username);

        // Notify the user
        this.toastService.pushToToaster('You are now logged in', ToastType.SUCCESS);

        // Navigate to the user dashboard
        await this.navigateToUserDashboard()

        return response;
      }),
      catchError(httpErrorResponse => {
        httpErrorResponse.error.forEach((error: string) => {
          this.toastService.pushToToaster(error, ToastType.DANGER);
        })
        return of(null);
      })
    );
  }
  register(user: UserInformations): Observable<any> {
    return this.http.post<any>(`${BACKEND_API}/authentication/signUp`, user).pipe(
      map(async response => {

        // Check if the response or the token is not provided
        if (!response || !response.token) {
          this.toastService.pushToToaster('Error Server: Token or response not provided', ToastType.DANGER);
          return response;
        }

        // Set the token
        this.token.set(response.token);

        // Set the username
        this.userService.setUserName(user.username);

        // Set email
        this.userService.setEmail(user.email);

        // Notify the user
        this.toastService.pushToToaster('You are now registered and auto-logged in', ToastType.SUCCESS);

        // Navigate to the user dashboard
        await this.navigateToUserDashboard()

        return response;
      }),
      catchError(httpErrorResponse => {
        httpErrorResponse.error.forEach((error: string) => {
          this.toastService.pushToToaster(error, ToastType.DANGER);
        })
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
