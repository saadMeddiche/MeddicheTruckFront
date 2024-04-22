import { Component } from '@angular/core';
import {lowerCaseFirstLetter} from "@app/utils/text";

@Component({
  selector: 'app-base-image',
  templateUrl: './base-image.component.html',
  styleUrl: './base-image.component.scss'
})
export class BaseImageComponent {

  protected readonly lowerCaseFirstLetter = lowerCaseFirstLetter;
}
