import {Component, Inject} from '@angular/core';
import {PopupService} from "../../popup/services/popup.service";
import {Router} from "@angular/router";
import {PopupType} from "../../popup/enums/PopupType";
import {PieceImage} from "../../piece/models/PieceImage";
import {BaseModel} from "../models/BaseModel";
import {BaseService} from "../services/base.service";
import {BaseModelImage} from "../models/BaseModelImage";
import {BaseImage} from "../models/BaseImage";
import {getSingularName} from "../../../utils/text";

@Component({
  template: ''
})
export abstract class BaseAddComponent<I extends BaseModelImage , K extends string, S extends BaseService<I , K>> {

  item: I ;

  abstract initializeItem(): I;

  protected constructor(
    @Inject(BaseService) protected itemService: S,
    protected popup: PopupService,
    protected router: Router
  ) {
    this.item = this.initializeItem();
  }

  addItem() {
    if (this.item.images.length === 0) {
      this.popup.show(['Please select at least one image.'], PopupType.ERROR);
      return;
    }

    this.itemService.addItem(this.item).subscribe(
      () => {
        this.popup.show([`${getSingularName(this.itemService.key)} Added Successfully`], PopupType.SUCCESS);
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);
        this.popup.show(httpErrorResponse.error, PopupType.ERROR);
      }
    );
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      for (let i = 0; i < inputElement.files.length; i++) {
        const file = inputElement.files[i];
        this.readFile(file);
      }
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const itemImage: BaseImage = {
        id: null,
        name: file.name.split('.')[0],
        photoInBase64Format: (reader.result as string).split(',')[1],
        photoPath: null
      };

      this.item.images.push(itemImage);
    };
  }

  removeImage(image: BaseImage) {
    const index = this.item.images.indexOf(image);
    if (index !== -1) {
      this.item.images.splice(index, 1);
    }
  }

  gotoItemList(){
    this.router.navigate([`/${this.itemService.key}/list`]);
  }
}
