import { Component } from '@angular/core';
import {PopupService} from "./services/popup.service";
import {PopupType} from "./enums/PopupType";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  popupContent: string[] = [];
  isVisible = false;
  popupType: PopupType  = PopupType.WARNING;

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.popupContent$.subscribe(content => {
      this.popupContent = content;
    });

    this.popupService.popupVisibility$.subscribe(isVisible => {
      this.isVisible = isVisible;

    });

    this.popupService.popupType$.subscribe(type => {
      this.popupType = type;
    });
  }

  closePopup() {
    this.popupService.hide();
  }
}
