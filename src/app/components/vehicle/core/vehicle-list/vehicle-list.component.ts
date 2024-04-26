import {Component, ViewChild} from '@angular/core';
import {Vehicle} from "@app/components/vehicle/models/vehicle";
import {VehicleService} from "@app/components/vehicle/services/vehicle.service";
import {Router} from "@angular/router";
import {Column} from "@app/base/models/Column";
import {ColumnType} from "@app/base/enums/ColumnType";
import {MyInput} from "@app/base/models/MyInput";
import {InputType} from "@app/base/enums/InputType";
import {VehicleType} from "@app/components/vehicle/enums/vehicle.type";
import {EngineType} from "@app/components/vehicle/enums/engine.type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "@app/base/services/validation.service";
import {BaseAddComponent} from "@app/base/core/base-add/base-add.component";
import {BaseDeleteComponent} from "@app/base/core/base-delete/base-delete.component";
import {ID} from "@app/types/GeneralTypes";
import {BaseListComponent} from "@app/base/core/base-list/base-list.component";
import {BaseUpdateComponent} from "@app/base/core/base-update/base-update.component";
import {Location} from "@angular/common";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent extends ValidationService
{

  @ViewChild(BaseAddComponent)
  baseAddComponent!: BaseAddComponent<Vehicle, VehicleService>;

  @ViewChild(BaseUpdateComponent)
  baseUpdateComponent!: BaseUpdateComponent<Vehicle, VehicleService>;

  @ViewChild(BaseDeleteComponent)
  baseDeleteComponent!: BaseDeleteComponent<Vehicle, VehicleService>;

  @ViewChild(BaseListComponent)
  baseListComponent!: BaseListComponent<Vehicle, VehicleService>;

   constructor(
       protected vehicleService: VehicleService,
       override router: Router,
       override location: Location
   ) {
     super(router, location);
   }

    columns : Column<Vehicle>[] = [
      {
         name: 'plate',
         label: 'Plate' ,
         type: ColumnType.TEXT,
         value: (item: Vehicle) => item.plate
      },
      {
        name: 'model',
        label: 'Model',
        type: ColumnType.TEXT,
        value: (item: Vehicle) => item.model
      },
      {
        name: 'type',
        label: 'Type' ,
        type: ColumnType.TEXT,
        value: (item: Vehicle) => item.type
      },
      {
        name: 'engineType',
        label: 'Engine Type',
        type: ColumnType.TEXT,
        value: (item: Vehicle) => item.engineType
      },
      {
        name:'image',
        label: 'Images',
        type: ColumnType.IMAGE,
        value: (_item: Vehicle) => "images",
        function: (item: Vehicle) => this.navigateToVehicleImages(item.id)
      }
   ]

    inputs : MyInput<Vehicle>[] =[
      {
        name: 'plate',
        label: 'Plate',
        type: InputType.TEXT,
        validationMessage: () => this.getErrorName('plate')
      },
      {
        name: 'model',
        label: 'Model',
        type: InputType.TEXT,
        validationMessage: () => this.getErrorName('model')
      },
      {
        name: 'type',
        label: 'Type',
        type: InputType.SELECT,
        options: Object.values(VehicleType),
        validationMessage: () => this.getErrorName('type')
      },
      {
        name: 'engineType',
        label: 'Engine Type',
        type: InputType.SELECT,
        options: Object.values(EngineType),
        validationMessage: () => this.getErrorName('engineType')
      }
    ]

    override buildForm() : FormGroup {
      return new FormGroup({
        plate: new FormControl('', [
          Validators.required
        ]),
        model: new FormControl('', [
          Validators.required
        ]),
        type: new FormControl(VehicleType.CAR, [
          Validators.required
        ]),
        engineType: new FormControl(EngineType.FUEL, [
          Validators.required
        ]),
        inStock: new FormControl(true, [
        Validators.required
      ])
      });
    }

    addVehicle(){
      this.baseAddComponent.toggleModal();
    }

    editVehicle(vehicleId :ID){
        console.log(vehicleId);
       this.baseUpdateComponent.startUpdateProcess(vehicleId);
    }

    deleteVehicle(vehicleId :ID){
      this.baseDeleteComponent.startDeleteProcess(vehicleId);
    }

    refreshList(){
      this.baseListComponent.searchItems();
    }

}
