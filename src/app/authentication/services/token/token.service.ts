import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {LocalStorageService} from "@app/base/services/local-storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Token} from "@app/authentication/models/Token";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {BACKEND_API} from "@app/configurations/api";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {TokenValidationRequest} from "@app/authentication/models/TokenValidationRequest";
import {UserService} from "@app/authentication/services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey = 'token';

  constructor(
    private localStorageService :LocalStorageService,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private toastService: ToastService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  set(token: string): void {
    if(!token){
      console.error('\n[TokenService](set) Token is not provided\n');
      return;
    }
    this.localStorageService.setItem(this.tokenKey, token);
  }

  get(): string | null {
     const token = this.localStorageService.getItem(this.tokenKey);
     if(!token){
       console.error('\n[TokenService](get) Token is not found\n');
       return null
     }
      return token;
  }

  getDetails(): Token | null{
    const token = this.get();
    if(!token){
      console.error('\n[TokenService](getDetails) Token is not found\n');
      return null;
    }
    return this.jwtHelper.decodeToken(token);
  }

  exists(): boolean {
    return !!this.localStorageService.getItem(this.tokenKey);
  }

  notExists(): boolean {
    return !this.exists();
  }

  remove(): void {
    if(this.notExists()){
      console.error('\n[TokenService](remove) Token is not found\n');
      return;
    }
    this.localStorageService.removeItem(this.tokenKey);
  }

  checkValidation(tokenValidationRequest :TokenValidationRequest): Observable<boolean> {
    return this.http.post<boolean>(`${BACKEND_API}/token/validate`,tokenValidationRequest );
  }

  isValid(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

      const token = this.get();
      const username = this.userService.getUsername();

      if (!token) {
        console.error('\n[TokenService](isValid) Token is not found\n');
        resolve(false);
        return;
      }

      if (!username) {
        console.error('\n[TokenService](isValid) Username is not found\n');
        resolve(false);
        return;
      }

      this.checkValidation({username ,token}).subscribe(
        (response : boolean) => {
          resolve(response);
        },
        (httpErrorResponse) => {
          this.toastService.pushToToaster("Error Server #1", ToastType.DANGER);
          resolve(false);
        }
      );

    });
  }
  //   if (isPlatformBrowser(this.platformId)) {
  //     return localStorage.getItem(this.tokenName);
  //   }

}
