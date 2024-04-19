import { Component } from '@angular/core';
import {BaseListComponent} from "@app/base/core/base-list/base-list.component";
import {Vehicle} from "@app/components/vehicle/models/vehicle";
import {VehicleService} from "@app/components/vehicle/services/vehicle.service";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Router} from "@angular/router";

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
     override router: Router
 ) {
   super( itemService, toastService, router);
 }
}
