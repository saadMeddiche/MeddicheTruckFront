import {Component} from '@angular/core';
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

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent extends ValidationService
{
   constructor(
       protected vehicleService: VehicleService,
       override router: Router,
   ) {
     super(router);
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
      });
    }

}
