import {Routes} from "@angular/router";
import {VehicleComponent} from "./vehicle.component";
import {AuthGuard} from "../../authentication/guards/auth.guard";
import {VehicleAddComponent} from "./components/vehicle-add/vehicle-add.component";
import {VehicleUpdateComponent} from "./components/vehicle-update/vehicle-update.component";
import {VehicleListComponent} from "./components/vehicle-list/vehicle-list.component";


export const vehicleRoutes: Routes = [
  {path: 'vehicles' , component: VehicleComponent , canActivate: [AuthGuard]},
  {path: 'vehicles/add' , component: VehicleAddComponent, canActivate: [AuthGuard]},
  {path: 'vehicles/edit/:id' , component: VehicleUpdateComponent, canActivate: [AuthGuard]},
  {path: 'vehicles/list' , component: VehicleListComponent, canActivate: [AuthGuard]}
]
