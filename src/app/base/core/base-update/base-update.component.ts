import {Component, Inject} from '@angular/core';
import {BaseModelImage} from "@app/base/models/BaseModelImage";
import {BaseService} from "@app/base/services/base.service"
import {ImageHolder} from "@app/interfaces/ImageHolder";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "@app/authentication/services/authentication/auth.service";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {ImageType} from "@app/enums/ImageType";
import {BACKEND} from "@app/configurations/api";
import {BaseImage} from "@app/base/models/BaseImage";
import {getSingularName} from "@app/utils/text";

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
      protected toastService: ToastService,
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
        this.toastService.pushToToaster(`${getSingularName(this.itemService.key)} updated successfully`, ToastType.SUCCESS);
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);
        this.toastService.pushToToaster(httpErrorResponse.error.message, ToastType.DANGER);
      }
    );
  }

  uploadImages(){
    if (this.images.length === 0) {
      this.toastService.pushToToaster('Please add at least one image', ToastType.DANGER);
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
            this.toastService.pushToToaster(`${getSingularName(this.itemService.key)} Not Found`, ToastType.DANGER);
            this.gotoItemList();
            return;
          }
          this.toastService.pushToToaster(httpErrorResponse.error.message, ToastType.DANGER);
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
