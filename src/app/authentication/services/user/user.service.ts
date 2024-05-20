import { Injectable } from '@angular/core';
import {LocalStorageService} from "@app/base/services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private localStorageService : LocalStorageService) { }

  setUserName(username: string): void {
    if(!username){
      console.error('\n[UserService](setUserName) Username is not provided\n');
      return;
    }
    this.localStorageService.setItem('username', username);
  }

  getUsername(): string | null {
    const username = this.localStorageService.getItem('username');
    if(!username){
      console.error('\n[UserService](getUserName) Username is not found\n');
      return null
    }
    return username;
  }

  removeUsername(): void {
    this.localStorageService.removeItem('username');
  }

  existsUsername(): boolean {
    return !!this.localStorageService.getItem('username');
  }

  notExistsUsername(): boolean {
    return !this.existsUsername();
  }

  setEmail(email: string): void {
    if(!email){
      console.error('\n[UserService](setEmail) Email is not provided\n');
      return;
    }
    this.localStorageService.setItem('email', email);
  }

  getEmail(): string | null {
    const email = this.localStorageService.getItem('email');
    if(!email){
      console.error('\n[UserService](getEmail) Email is not found\n');
      return null
    }
    return email;
  }

  removeEmail(): void {
    this.localStorageService.removeItem('email');
  }

  existsEmail(): boolean {
    return !!this.localStorageService.getItem('email');
  }

  notExistsEmail(): boolean {
    return !this.existsEmail();
  }

  cleanUserData(){
    this.removeUsername();
    this.removeEmail();
  }


}
