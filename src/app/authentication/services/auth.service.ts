import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BACKEND_API } from '../../configurations/api';
import { UserInformations } from '../models/UserInformations';
import { UsernameAndPassword } from '../models/UsernameAndPassword';
import { Token } from '../models/Token';
import { Permissions } from '../../enums/permissions';
import {isPlatformBrowser} from "@angular/common";
import {PopupType} from "../../components/popup/enums/PopupType";
import {PopupService} from "../../components/popup/services/popup.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenName = 'token';
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private popup: PopupService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: UsernameAndPassword): Observable<any> {
    return this.http.post<any>(`${BACKEND_API}/authentication/signIn`, credentials).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenName, response.token);
        }
        this.popup.show(['You are now logged in'], PopupType.SUCCESS);
        return response;
      }),
      catchError(httpErrorResponse => {

        this.popup.show(httpErrorResponse.error, PopupType.ERROR);
        return of(null);

      })
    );
  }

  register(user: UserInformations): Observable<any> {
    return this.http.post<any>(`${BACKEND_API}/authentication/signUp`, user).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenName, response.token);
        }
        return response;
      }),
      catchError(error => {
        // Handle error here
        console.error('Registration error:', error);
        return of(null);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenName);
    this.router.navigate(['/signin']);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenName);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getDecodedToken(): Token | null {
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) as Token : null;
  }

  hasPermission(permission: Permissions): boolean {
    const decodedToken = this.getDecodedToken();
    return decodedToken && decodedToken.authorities ? decodedToken.authorities.includes(permission) : false;
  }

  haveUserDashboardAccess(): boolean {
    return this.hasPermission(Permissions.ACCESS_USER_DASHBOARD);
  }

  haveAdminDashboardAccess(): boolean {
    return this.hasPermission(Permissions.ACCESS_ADMIN_DASHBOARD);
  }
}
