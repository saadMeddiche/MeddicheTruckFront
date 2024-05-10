import {Component, ViewChild} from '@angular/core';
import {Vehicle} from "@app/components/vehicle/models/vehicle";
import {VehicleService} from "@app/components/vehicle/services/vehicle.service";
import {Router} from "@angular/router";
import {BaseAddComponent} from "@app/base/core/base-add/base-add.component";
import {BaseDeleteComponent} from "@app/base/core/base-delete/base-delete.component";
import {ID} from "@app/types/GeneralTypes";
import {BaseListComponent} from "@app/base/core/base-list/base-list.component";
import {BaseUpdateComponent} from "@app/base/core/base-update/base-update.component";
import {Location} from "@angular/common";
import {NavigationService} from "@app/base/services/navigation.service";
import {VehicleTransactionService} from "@app/components/vehicle-transaction/services/VehicleTransactionService";
import {RowButton} from "@app/base/models/RowButton";
import {VehicleTransaction} from "@app/components/vehicle-transaction/models/VehicleTransaction";
import {VehicleForms} from "@app/components/vehicle/data/VehicleForms";
import {VehicleExtraRowButton, VehicleList} from "@app/components/vehicle/data/VehicleList";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent extends NavigationService
{

  @ViewChild(BaseAddComponent)
  baseAddComponent!: BaseAddComponent<Vehicle, VehicleService>;

  @ViewChild('Transactions')
  baseAddTransactionComponent!: BaseAddComponent<VehicleTransaction, VehicleTransactionService>;

  @ViewChild(BaseUpdateComponent)
  baseUpdateComponent!: BaseUpdateComponent<Vehicle, VehicleService>;

  @ViewChild(BaseDeleteComponent)
  baseDeleteComponent!: BaseDeleteComponent<Vehicle, VehicleService>;

  @ViewChild(BaseListComponent)
  baseListComponent!: BaseListComponent<Vehicle, VehicleService>;

  constructor(
    protected vehicleService: VehicleService,
    override router: Router,
    override location: Location,
    protected vehicleTransactionService: VehicleTransactionService,
    protected vehicleForms: VehicleForms,
    protected vehicleList: VehicleList
  ) {
    super(router, location);
  }

  addButtonIsClicked(){
    this.baseAddComponent.toggleModal();
  }

  editButtonIsClicked(vehicleId :ID){
    this.baseUpdateComponent.startUpdateProcess(vehicleId);
  }

  deleteButtonIsClicked(vehicleId :ID){
    this.baseDeleteComponent.startDeleteProcess(vehicleId);
  }

  refreshList(){
    this.baseListComponent.searchItems();
  }

  extraButtonIsClicked(button: RowButton<Vehicle>){

    // Define the action for the clicked button

    switch (button.id) {
      case VehicleExtraRowButton.VEHICLE_ADD_TRANSACTION:
        this.vehicleForms.transactionForm.get('vehicleId')!.setValue(button.item?.id);
        this.baseAddTransactionComponent.toggleModal();
        break;
      case VehicleExtraRowButton.VEHICLE_TRANSACTIONS:
        alert("see transaction")
        break;
    }

  }

}
