import {Routes} from "@angular/router";
import {VehicleListComponent} from "@app/components/vehicle/core/vehicle-list/vehicle-list.component";
import {Pages} from "@app/data/pages";
import {AuthGuard} from "@app/authentication/guards/auth.guard";


export const vehicleRoutes: Routes = [
  {
    path: Pages.VEHICLES_LIST,
    component: VehicleListComponent,
    canActivate: [AuthGuard]
  },
];
