import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // Method to set data in localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Method to get data from localStorage
  getItem(key: string): any {
    let item = null;
    // if (isPlatformBrowser(this.platformId)) {
      item = localStorage.getItem(key);
    // }
    return item ? JSON.parse(item) : null;
  }

  // Method to remove data from localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Method to clear all data from localStorage
  clear(): void {
    localStorage.clear();
  }
}
