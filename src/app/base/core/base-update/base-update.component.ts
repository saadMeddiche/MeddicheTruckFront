import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseModel} from "@app/base/models/BaseModel";
import {BaseService} from "@app/base/services/base.service";
import {NavigationService} from "@app/base/services/navigation.service";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Router} from "@angular/router";
import {MyInput} from "@app/base/models/MyInput";
import {FormGroup} from "@angular/forms";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {InputType} from "@app/base/enums/InputType";
import {ID} from "@app/types/GeneralTypes";
import {Location} from "@angular/common";

@Component({
  selector: 'app-base-update',
  templateUrl: './base-update.component.html',
  styleUrl: './base-update.component.scss'
})
export class BaseUpdateComponent<I extends BaseModel, S extends BaseService<I>> extends NavigationService {

  @Input() inputs!: MyInput<I>[];

  @Input() form!: FormGroup;

  @Input() service!: S;

  itemID!: ID;

  isModalVisible: boolean = false;

  @Output() itemIsUpdated = new EventEmitter<void>();

  alertParentThatItemIsUpdated(){
    this.itemIsUpdated.emit();
  }

  public constructor(
    protected toastService: ToastService,
    override router: Router,
    override location: Location
  ) {
    super(router, location);
  }

  getItem(itemID: ID){

    this.itemID = itemID;

    this.service.getItem(itemID).subscribe(
      (item) => {
        this.form.patchValue(item);
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);

        if(httpErrorResponse.status === 401 ){
          this.toastService.pushToToaster("Error: Please reload page or re-login", ToastType.DANGER);
        }

        this.toastService.pushToToaster(`${this.service.getItemName()} didn't fetched as expected`, ToastType.DANGER);
      }
    );
  }

  updateItem(){

    this.form.value.id = this.itemID;

    this.service.updateItem(this.form.value).subscribe(
      () => {
        this.toastService.pushToToaster(`${this.service.getItemName()} updated successfully`, ToastType.SUCCESS);
        this.toggleModal();
        this.alertParentThatItemIsUpdated();
        this.clearForm();
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);

        if(httpErrorResponse.status === 401 ){
          this.toastService.pushToToaster("Error: Please reload page or re-login", ToastType.DANGER);
        }

        this.toastService.pushToToaster(`${this.service.getItemName()} didn't updated as expected`, ToastType.DANGER);
      }
    );
  }

  startUpdateProcess(itemID: ID){
    this.toggleModal();

    if(this.isModalVisible){
      this.getItem(itemID);
    }
  }

  toggleModal(){
    this.isModalVisible = !this.isModalVisible;
  }

  clearForm(){
    this.form.reset();
  }

  protected readonly InputType = InputType;
}
