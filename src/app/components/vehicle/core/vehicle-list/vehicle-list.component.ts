import { Component } from '@angular/core';
import {BaseListComponent} from "@app/base/core/base-list/base-list.component";
import {Vehicle} from "@app/components/vehicle/models/vehicle";
import {VehicleService} from "@app/components/vehicle/services/vehicle.service";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Router} from "@angular/router";
import {lowerCaseFirstLetter, upperCaseFirstLetter} from "@app/utils/text";
import {AuthService} from "@app/authentication/services/authentication/auth.service";
import {Column} from "@app/base/models/Column";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent extends BaseListComponent<Vehicle, VehicleService>
{
   constructor(
       override itemService: VehicleService,
       override toastService: ToastService,
       override router: Router,
       override authService: AuthService
   ) {
     super( itemService, toastService, router , authService);
   }

   override columns : Column<Vehicle>[] = [
      {
         name: 'plate',
         label: 'Plate' ,
         type: 'text',
         value: (item: Vehicle) => item.plate
      },
      {
        name: 'model',
        label: 'Model',
        type: 'text',
        value: (item: Vehicle) => item.model
      },
      {
        name: 'type',
        label: 'Type' ,
        type: 'text',
        value: (item: Vehicle) => item.type
      },
      {
        name: 'engineType',
        label: 'Engine Type',
        type: 'text',
        value: (item: Vehicle) => item.engineType
      }
   ]

   protected readonly upperCaseFirstLetter = upperCaseFirstLetter;
   protected readonly lowerCaseFirstLetter = lowerCaseFirstLetter;
}
