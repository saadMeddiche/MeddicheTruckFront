import {Component, ViewChild} from '@angular/core';
import {BaseUpdateComponent} from "@app/base/core/base-update/base-update.component";
import {BaseDeleteComponent} from "@app/base/core/base-delete/base-delete.component";
import {BaseListComponent} from "@app/base/core/base-list/base-list.component";
import {ID} from "@app/types/GeneralTypes";
import {VehicleTransaction} from "@app/components/vehicle-transaction/models/VehicleTransaction";
import {VehicleTransactionService} from "@app/components/vehicle-transaction/services/VehicleTransactionService";
import {VehicleTransactionForms} from "@app/components/vehicle-transaction/data/VehicleTransactionForms";
import {VehicleTransactionList} from "@app/components/vehicle-transaction/data/VehicleTransactionList";

@Component({
  selector: 'app-vehicle-transaction-list',
  templateUrl: './vehicle-transaction-list.component.html',
  styleUrl: './vehicle-transaction-list.component.scss'
})
export class VehicleTransactionListComponent {

  @ViewChild(BaseUpdateComponent)
  baseUpdateComponent!: BaseUpdateComponent<VehicleTransaction, VehicleTransactionService>;

  @ViewChild(BaseDeleteComponent)
  baseDeleteComponent!: BaseDeleteComponent<VehicleTransaction, VehicleTransactionService>;

  @ViewChild(BaseListComponent)
  baseListComponent!: BaseListComponent<VehicleTransaction, VehicleTransactionService>;

  constructor(
    protected vehicleTransactionService: VehicleTransactionService,
    protected vehicleTransactionForm: VehicleTransactionForms,
    protected vehicleTransactionList: VehicleTransactionList
  ) {}

  editButtonIsClicked(vehicleId :ID){
    this.baseUpdateComponent.startUpdateProcess(vehicleId);
  }

  deleteButtonIsClicked(vehicleId :ID){
    this.baseDeleteComponent.startDeleteProcess(vehicleId);
  }

  refreshList(){
    this.baseListComponent.searchItems();
  }
}
