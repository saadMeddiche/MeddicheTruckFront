import {Component, Input} from '@angular/core';
import {ID} from "@app/types/GeneralTypes";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {BaseModel} from "@app/base/models/BaseModel";
import {BaseService} from "@app/base/services/base.service";
import {ToastService} from "@app/layouts/toast/services/toast.service";

@Component({
  selector: 'app-base-delete',
  templateUrl: './base-delete.component.html',
  styleUrl: './base-delete.component.scss'
})
export class BaseDeleteComponent<I extends BaseModel, S extends BaseService<I>> {

  protected idOfLastClickedItem: ID = null;

  protected isModalVisible: boolean = false;

   @Input() service!: S;

  constructor(private toastService: ToastService) {}

  protected deleteItem(itemID: ID){
    this.service.deleteItem(itemID).subscribe(
      () => {
        this.toastService.pushToToaster(`${this.service.getItemName()} deleted successfully`, ToastType.SUCCESS);
      },
      (httpErrorResponse) => {

        if(httpErrorResponse.status === 404){
          this.toastService.pushToToaster(`${this.service.getItemName()} not found`, ToastType.DANGER);
          return;
        }

        if(httpErrorResponse.status === 401){
          this.toastService.pushToToaster("Error: Please reload page or re-login", ToastType.DANGER);
          return;
        }

        console.error(httpErrorResponse);

        this.toastService.pushToToaster(`${this.service.getItemName()} didn't deleted as expected`, ToastType.DANGER);
      }
    );
    this.toggleModal()
  }

  startDeleteProcess(itemID: ID){
    this.idOfLastClickedItem = itemID;
    this.toggleModal()
  }

  protected toggleModal(){
    this.isModalVisible = !this.isModalVisible;
  }
}
