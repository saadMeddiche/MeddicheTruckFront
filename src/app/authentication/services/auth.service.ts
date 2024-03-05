import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND_API} from "../../configurations/api";
import {UserInformations} from "../models/UserInformations";
import {UsernameAndPassword} from "../models/UsernameAndPassword";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient , private router:Router) { }

  login(credentials : UsernameAndPassword) {
    return this.http.post<any>(`${BACKEND_API}/authentication/signIn` , credentials);
  }

  register(user : UserInformations) {
    return this.http.post<any>(`${BACKEND_API}/authentication/signUp ` , user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // !! is a trick (JavaScript idiom) to convert null to boolean , if it is null it will be false
    return !!localStorage.getItem('token');
  }


}
