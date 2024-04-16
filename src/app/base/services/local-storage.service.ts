import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Method to set data in localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Method to get data from localStorage
  getItem(key: string): any {
    const item = localStorage.getItem(key);
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
