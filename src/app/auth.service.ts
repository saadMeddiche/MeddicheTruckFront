import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND_API} from "./configurations/api";
import {UserInformations} from "./authentication/models/UserInformations";
import {UsernameAndPassword} from "./authentication/models/UsernameAndPassword";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) { }

  login(credentials : UsernameAndPassword) {
    return this.http.post<any>(`${BACKEND_API}/signIn ` , credentials);
  }

  register(user : UserInformations) {
    return this.http.post<any>(`${BACKEND_API}/signUp ` , user);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // !! is a trick (JavaScript idiom) to convert null to boolean , if it is null it will be false
    return !!localStorage.getItem('token');
  }


}
