import {Component} from '@angular/core';
import {Vehicle} from "@app/components/vehicle/models/vehicle";
import {VehicleService} from "@app/components/vehicle/services/vehicle.service";
import {Router} from "@angular/router";
import {Column} from "@app/base/models/Column";
import {NavigationService} from "@app/base/services/navigation.service";
import {ColumnType} from "@app/base/enums/ColumnType";
import {MyInput} from "@app/base/models/MyInput";
import {InputType} from "@app/base/enums/InputType";
import {VehicleType} from "@app/components/vehicle/enums/vehicle.type";
import {EngineType} from "@app/components/vehicle/enums/engine.type";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent extends NavigationService
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
        defaultValue: "",
      },
      {
        name: 'model',
        label: 'Model',
        type: InputType.TEXT,
        defaultValue: "",
      },
      {
        name: 'type',
        label: 'Type',
        type: InputType.SELECT,
        defaultValue: VehicleType.CAR,
        options: Object.values(VehicleType),
      },
      {
        name: 'engineType',
        label: 'Engine Type',
        type: InputType.SELECT,
        defaultValue: EngineType.FUEL,
        options: Object.values(EngineType),
      }
    ]

}
