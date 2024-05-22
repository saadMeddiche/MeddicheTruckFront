import {Component, Input} from '@angular/core';
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Router} from "@angular/router";
import {PaginatedResponse} from "@app/interfaces/PaginatedResponse";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {of} from "rxjs";
import {BaseReceivedImage} from "@app/base/models/image/BaseReceivedImage";
import {BACKEND} from "@app/configurations/api";
import {BaseSentImage} from "@app/base/models/image/BaseSentImage";
import {BaseImageService} from "@app/base/services/base-image.service";
import {ValidationService} from "@app/base/services/validation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {fileTypeValidator, noSpaceValidator} from "@app/base/validation/costum-validators/costum.validators";
import {ID} from "@app/types/GeneralTypes";
import {Location} from "@angular/common";

@Component({
  selector: 'app-base-image',
  templateUrl: './base-image.component.html',
  styleUrl: './base-image.component.scss'
})
export class BaseImageComponent<IR extends BaseReceivedImage , IS extends BaseSentImage, S extends BaseImageService<IR , IS>> extends ValidationService {

  @Input() itemService!: S ;

  @Input() itemId!: number;

  @Input() itemName!: string;

  images: IR[] = [];

  uploadImages: FormData[] = [];

  page: number = 0;

  size: number = 12;

  totalPages: number = 0;

  searchTerm: string = "";

  isModalVisible: boolean = false;

  override buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [
        noSpaceValidator()
      ]),
      files: new FormControl('', [
        Validators.required,
        fileTypeValidator(['png', 'jpeg', 'jpg'])
      ])
    })
  }

  public constructor(
    protected toastService: ToastService,
    override router: Router,
    override location: Location
  ) {
    super(router, location);
  }

  ngOnInit() {
    this.searchItemImages();
  }

  onSearch() {
    this.searchItemImages();
  }

  searchItemImages() {
    this.itemService.searchImagesByItemId(this.searchTerm , this.page , this.size, this.itemId).subscribe(
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

    this.uploadImages.forEach((formData , index) => {

      this.itemService.uploadImage(formData).subscribe
      (
        () => {
          this.toastService.pushToToaster(`Image ${index} uploaded successfully`, ToastType.SUCCESS);
          this.searchItemImages();
        },
        (httpErrorResponse) => {
          console.error(httpErrorResponse);

          if (httpErrorResponse.status === 401) {
            this.toastService.pushToToaster("Error: Please reload page or re-login", ToastType.DANGER);
          }

          this.toastService.pushToToaster(httpErrorResponse.error, ToastType.DANGER);
        }
      )

    })

  }

  deleteImage(imageID: ID){
    this.itemService.deleteImage(imageID).subscribe(
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
    let formData = new FormData();
    formData.append('photo', file);
    formData.append('name', (this.form.get('name')?.value != null && this.form.get('name')?.value != "")
      ? this.form.get('name')?.value : file.name);
    formData.append(this.itemName, this.itemId.toString());
    this.uploadImages.push(formData);
  }

  pageChanged(n: number) {
    this.page = n;
    this.searchItemImages();
  }

  clearSearchTerm(){
    this.searchTerm = "";
    this.searchItemImages();
  }

  toggleModal(){
    this.isModalVisible = !this.isModalVisible;
  }

  protected readonly BACKEND = BACKEND;
}
