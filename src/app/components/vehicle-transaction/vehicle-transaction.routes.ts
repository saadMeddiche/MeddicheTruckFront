import {Routes} from "@angular/router";
import {Pages} from "@app/data/pages";
import {AuthGuard} from "@app/authentication/guards/auth.guard";
import {
  VehicleTransactionListComponent
} from "@app/components/vehicle-transaction/core/vehicle-transaction-list/vehicle-transaction-list.component";

export const vehicleTransactionRoutes: Routes = [
  {
    path:Pages.VEHICLE_TRANSACTIONS_LIST,
    component: VehicleTransactionListComponent,
    canActivate: [AuthGuard],
  }
]
