import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Toast} from "@app/layouts/toast/models/Toast";
import {ToastType} from "@app/layouts/toast/enums/ToastType";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toasts: Toast[] = [];
  private toaster = new Subject<Toast[]>();
  toaster$ = this.toaster.asObservable();

  constructor() { }

  pushToToaster(message :string , toastType :ToastType): void {
    const toast = new Toast(message, toastType);
    this.limitToasts();
    this.toasts.push(toast);
    this.toaster.next(this.toasts);
  }

  cleanToaster(): void {
    this.toasts = [];
    this.toaster.next(this.toasts);
  }

  removeToast(uuid: string): void {
    this.toasts = this.toasts.filter(toast => toast.uuid !== uuid);
    this.toaster.next(this.toasts);
  }

  limitToasts(){
    if(this.toasts.length >= 5){
      this.toasts.shift();
      this.toaster.next(this.toasts);
    }
  }
}
