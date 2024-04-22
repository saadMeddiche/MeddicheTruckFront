import {Component, Input} from '@angular/core';
import {NavigationService} from "@app/base/services/navigation.service";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Router} from "@angular/router";
import {PaginatedResponse} from "@app/interfaces/PaginatedResponse";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {of} from "rxjs";
import {BaseReceivedImage} from "@app/base/models/image/BaseReceivedImage";
import {BACKEND_API} from "@app/configurations/api";
import {getSingularName, lowerCaseFirstLetter, replaceUpperCaseWithSpace} from "@app/utils/text";
import {BaseSentImage} from "@app/base/models/image/BaseSentImage";
import {BaseImageService} from "@app/base/services/base-image.service";

@Component({
  selector: 'app-base-image',
  templateUrl: './base-image.component.html',
  styleUrl: './base-image.component.scss'
})
export class BaseImageComponent<IR extends BaseReceivedImage , IS extends BaseSentImage, S extends BaseImageService<IR , IS>> extends NavigationService {

  @Input() image: IS | null = null;

  @Input() itemService: S | undefined;

  images: IR[] = [];

  page: number = 0;

  size: number = 5;

  totalPages: number = 0;

  searchTerm: string = "";

  public constructor(
    protected toastService: ToastService,
    override router: Router
  ) {
    super(router);
  }

  ngOnInit() {
    this.searchItemImages();
  }

  onSearch() {
    this.searchItemImages();
  }

  onPageChange(n: number) {
    this.page += n;
    this.searchItemImages();
  }

  searchItemImages() {
    this.itemService!.searchItems(this.searchTerm , this.page , this.size).subscribe(
      (response: PaginatedResponse<IR>) => {
        this.images = response.content;
        this.totalPages = response.totalPages;
        return response;
      },
      (httpErrorResponse) => {
        console.error(`\n[BaseImageComponent](searchItemImages) httpErrorResponse: `, httpErrorResponse);

        this.toastService.pushToToaster("Images aren't fetched correctly", ToastType.WARNING);

        if(httpErrorResponse.status === 401 ){
          this.toastService.pushToToaster("Error: Please reload page or re-login", ToastType.DANGER);
        }
        return of(null);
      }
    );
  }

  uploadImage() {
    this.itemService!.addItem(this.image!).subscribe
      (
      () => {
        this.toastService.pushToToaster(`${getSingularName(this.itemService!.key)} uploaded successfully`, ToastType.SUCCESS);
        this.searchItemImages();
      },
  (httpErrorResponse) => {
        console.error(httpErrorResponse);
        this.toastService.pushToToaster(httpErrorResponse.error, ToastType.DANGER);
      }
    )
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
      this.image!.id = null;
      this.image!.name = file.name.split('.')[0];
      this.image!.photoInBase64Format = (reader.result as string).split(',')[1];
    };
    console.log(this.image);
  }

  // removeImage(image: BaseImage) {
  //   const index = this.item.images.indexOf(image);
  //   if (index !== -1) {
  //     this.item.images.splice(index, 1);
  //   }
  // }

  getItemName(){
    return getSingularName(this.itemService!.key);
  }

  clearSearchTerm(){
    this.searchTerm = "";
    this.searchItemImages();
  }

  isPreviousDisabled(){
    return this.page === 0 || this.totalPages == 0
  }

  isNextDisabled(){
    return this.page === this.totalPages - 1 || this.totalPages == 0
  }

  currentPage(){
    return this.totalPages != 0 ? this.page + 1 : 0;
  }

  protected readonly BACKEND_API = BACKEND_API;
  protected readonly lowerCaseFirstLetter = lowerCaseFirstLetter;
  protected readonly replaceUpperCaseWithSpace = replaceUpperCaseWithSpace;
}
