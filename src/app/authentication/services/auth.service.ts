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
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {ToastService} from "@app/layouts/toast/services/toast.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenName = 'token';
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private toastService: ToastService,

    // ?????????????????
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: UsernameAndPassword): Observable<any> {
    return this.http.post<any>(`${BACKEND_API}/authentication/signIn`, credentials).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenName, response.token);
        }
        this.toastService.pushToToaster('You are now logged in', ToastType.SUCCESS);
        this.router.navigate(['/userDashboard']);
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
        if (response && response.token) {
          localStorage.setItem(this.tokenName, response.token);
        }
        this.toastService.pushToToaster('You are now registered and logged in', ToastType.SUCCESS);
        return response;
      }),
      catchError(httpErrorResponse => {
        this.toastService.pushToToaster(httpErrorResponse.error, ToastType.DANGER);
        return of(null);
      })
    );
  }

  checkTokenValidation(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get<any>(`${BACKEND_API}/token/validate`, { headers });
  }

  isTokenValid(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const token = this.getToken();

      if (!token) {
        resolve(false);
        return;
      }

      this.checkTokenValidation().subscribe(
        (response) => {
          resolve(response.valid);
        },
        (httpErrorResponse) => {
          localStorage.removeItem(this.tokenName);
          this.toastService.pushToToaster(httpErrorResponse.error, ToastType.DANGER);
          resolve(false);
        }
      );
    });
  }


  logout(): void {
    localStorage.removeItem(this.tokenName);
    this.router.navigate(['/signin']);
    this.toastService.pushToToaster('You are now logged out', ToastType.SUCCESS);
  }

  getToken(): string | null {
    // ??? need to check this
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenName);
    }
    return localStorage.getItem(this.tokenName);
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

  haveAccessAll(): boolean {
    return this.hasPermission(Permissions.ACCESS_ALL);
  }
}
