import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {BaseService} from "@app/base/services/base.service";
import {getSingularName} from "@app/utils/text";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {BaseSentImage} from "@app/base/models/image/BaseSentImage";
import {ValidationService} from "@app/base/services/validation.service";

@Component({
  template: ''
})
export abstract class BaseAddComponent<I extends BaseSentImage , S extends BaseService<I>> extends ValidationService {

  item: I ;

  abstract initializeItem(): I;

  protected constructor(
    @Inject(BaseService) protected itemService: S,
    protected toastService: ToastService,
    override router: Router
  ) {
    super(router);
    this.item = this.initializeItem();
  }

  addItem() {
    // if (this.item.images.length === 0) {
    //   this.toastService.pushToToaster('Please add at least one image', ToastType.DANGER);
    //   return;
    // }

    this.itemService.addItem(this.item).subscribe(
      () => {
        this.toastService.pushToToaster(`${getSingularName(this.itemService.key)} added successfully`, ToastType.SUCCESS);
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);
        this.toastService.pushToToaster(httpErrorResponse.error.message, ToastType.DANGER);
      }
    );
  }

  // onFileSelected(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length) {
  //     for (let i = 0; i < inputElement.files.length; i++) {
  //       const file = inputElement.files[i];
  //       this.readFile(file);
  //     }
  //   }
  // }

  // readFile(file: File) {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     const itemImage: BaseImage = {
  //       id: null,
  //       name: file.name.split('.')[0],
  //       photoInBase64Format: (reader.result as string).split(',')[1],
  //       photoPath: null
  //     };
  //
  //     this.item.images.push(itemImage);
  //   };
  // }

  // removeImage(image: BaseImage) {
  //   const index = this.item.images.indexOf(image);
  //   if (index !== -1) {
  //     this.item.images.splice(index, 1);
  //   }
  // }

}
