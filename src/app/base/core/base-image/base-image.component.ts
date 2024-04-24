import {Component, Input} from '@angular/core';
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Router} from "@angular/router";
import {PaginatedResponse} from "@app/interfaces/PaginatedResponse";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {of} from "rxjs";
import {BaseReceivedImage} from "@app/base/models/image/BaseReceivedImage";
import {BACKEND, BACKEND_API} from "@app/configurations/api";
import {getSingularName, lowerCaseFirstLetter, replaceUpperCaseWithSpace} from "@app/utils/text";
import {BaseSentImage} from "@app/base/models/image/BaseSentImage";
import {BaseImageService} from "@app/base/services/base-image.service";
import {ValidationService} from "@app/base/services/validation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {fileTypeValidator, noSpaceValidator} from "@app/base/validation/costum-validators/costum.validators";
import {ID} from "@app/types/GeneralTypes";

@Component({
  selector: 'app-base-image',
  templateUrl: './base-image.component.html',
  styleUrl: './base-image.component.scss'
})
export class BaseImageComponent<IR extends BaseReceivedImage , IS extends BaseSentImage, S extends BaseImageService<IR , IS>> extends ValidationService {

  @Input() image: IS | null = null;

  @Input() itemService: S | undefined;

  images: IR[] = [];

  page: number = 0;

  size: number = 12;

  totalPages: number = 0;

  searchTerm: string = "";

  override buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [
        noSpaceValidator()
      ]),
      file: new FormControl('', [
        Validators.required,
        fileTypeValidator(['png', 'jpeg', 'jpg'])
      ])
    })
  }

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
        this.toastService.pushToToaster(`Image uploaded successfully`, ToastType.SUCCESS);
        this.searchItemImages();
      },
  (httpErrorResponse) => {
        console.error(httpErrorResponse);

        if(httpErrorResponse.status === 401){
          this.toastService.pushToToaster("Error: Please reload page or re-login", ToastType.DANGER);
        }

        this.toastService.pushToToaster(httpErrorResponse.error, ToastType.DANGER);
      }
    )
  }

  deleteImage(imageID: ID){
    this.itemService!.deleteItem(imageID).subscribe(
      () => {
        this.toastService.pushToToaster(`Image deleted successfully`, ToastType.SUCCESS);
        this.searchItemImages();
      },
      (httpErrorResponse) => {

        if(httpErrorResponse.status === 404){
          this.toastService.pushToToaster(`Image not found`, ToastType.DANGER);
          return;
        }

        if(httpErrorResponse.status === 401){
          this.toastService.pushToToaster("Error: Please reload page or re-login", ToastType.DANGER);
          return;
        }

        console.error(httpErrorResponse);
        this.toastService.pushToToaster(`Image didn't deleted as expected`, ToastType.DANGER);
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
      this.image!.id = null;
      this.image!.name =
        this.form.get('name')?.value != ""
        ? this.form.get('name')?.value : file.name.split('.')[0];
      this.image!.photoInBase64 = (reader.result as string).split(',')[1];
    };
    console.log(this.image);
  }

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

  protected readonly lowerCaseFirstLetter = lowerCaseFirstLetter;
  protected readonly replaceUpperCaseWithSpace = replaceUpperCaseWithSpace;
  protected readonly BACKEND = BACKEND;
}
