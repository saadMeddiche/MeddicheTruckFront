import {Component, Inject} from '@angular/core';
import {BaseModelImage} from "../models/BaseModelImage";
import {BaseService} from "../services/base.service";
import {ImageHolder} from "../../../interfaces/ImageHolder";
import {PopupService} from "@app/layouts/popup/services/popup.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../authentication/services/auth.service";
import {PopupType} from "@app/layouts/popup/enums/PopupType";
import {ImageType} from "../../../enums/ImageType";
import {BACKEND} from "../../../configurations/api";
import {BaseImage} from "../models/BaseImage";
import {getSingularName} from "../../../utils/text";

@Component({
  template: ''
})
export abstract class BaseUpdateComponent<I extends BaseModelImage , K extends string, S extends BaseService<I , K>> {

  item: I;

  images : ImageHolder[] = [];

  abstract initializeItem(): I;

  abstract activateSupportImage: boolean;

  abstract test(images: ImageHolder[]) : void;

  abstract testDelete(image: ImageHolder) : void;

   protected constructor(
     @Inject(BaseService) protected itemService: S,
      protected popupService: PopupService,
      protected activatedRoute: ActivatedRoute,
      protected router :Router,
      protected authService : AuthService)
  {
    this.item = this.initializeItem();
  }

  async ngOnInit() {
     this.getItem();
  }

  updateItem() {

     if(this.activateSupportImage){
        const pass = this.uploadImages();
        if(!pass) return;
     }

    console.log(this.item);

    console.log(this.images);

    this.itemService.updateItem(this.item).subscribe(
      () => {
        this.popupService.show([`${getSingularName(this.itemService.key)} Updated Successfully`], PopupType.SUCCESS);
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);
        this.popupService.show(httpErrorResponse.error, PopupType.ERROR);
      }
    );
  }

  uploadImages(){
    if (this.images.length === 0) {
      this.popupService.show(['Please select at least one image.'], PopupType.ERROR);
      return false;
    }

    let images: BaseImage[] = this.parseImagesToItemImages(this.images);

    this.test(this.images);

    return true;
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

      const image: ImageHolder = {
        id: null,
        name: file.name.split('.')[0],
        type: ImageType.LOCAL,
        source: reader.result as string,
      };

      this.images.push(image);
    };
  }

  removeImage(image: ImageHolder) {
    const index = this.images.indexOf(image);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
    this.testDelete(image);
  }

  private getItem() :void {

      this.itemService.getItem(this.activatedRoute.snapshot.params['id']).subscribe(
        (item) =>{

          this.images = this.parseItemImagesToImages(item.images);
          this.item = item;
          this.item.images = [];

        },
        (httpErrorResponse) => {
          console.error(httpErrorResponse);
          if(httpErrorResponse.status === 404){
            this.popupService.show([`${getSingularName(this.itemService.key)} Not Found`], PopupType.ERROR);
            this.gotoItemList();
            return;
          }
          this.popupService.show(httpErrorResponse.error, PopupType.ERROR);
        }
      );
  }

  gotoItemList(){
    this.router.navigate([`/${this.itemService.key}/list`]);
  }

  private parseItemImagesToImages(itemImages: BaseImage[]): ImageHolder[] {
    return itemImages.map(itemImage => {
      return {
        id: itemImage.id,
        name: itemImage.name,
        type: ImageType.REMOTE,
        source: itemImage.photoPath as string
      };
    });
  }

  private parseImagesToItemImages(images: ImageHolder[]): BaseImage[] {
    return images.map(image => {
      return {
        id: image.type === ImageType.REMOTE ? image.id : null,
        name: image.name,
        photoInBase64Format: image.type === ImageType.LOCAL ? image.source.split(",")[1] as string : null,
        photoPath: image.type === ImageType.REMOTE ? image.source as string : null,
      };
    });
  }

  public displayImage(image: ImageHolder){
    return image.type == ImageType.LOCAL ? image.source : BACKEND + image.source;
  }
}
