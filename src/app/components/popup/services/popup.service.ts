import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {PopupType} from "../enums/PopupType";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupContentSource = new Subject<string[]>();
  popupContent$ = this.popupContentSource.asObservable();

  private popupVisibilitySource = new Subject<boolean>();
  popupVisibility$ = this.popupVisibilitySource.asObservable();

  private popupTypeSource = new Subject<PopupType>();
  popupType$ = this.popupTypeSource.asObservable();

  constructor() { }

  show(content: string[], type: PopupType) {
    this.popupContentSource.next(content);
    this.popupVisibilitySource.next(true);
    this.popupTypeSource.next(type);
  }

  hide() {
    this.popupVisibilitySource.next(false);
  }
}
