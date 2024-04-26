import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authRoutes} from "./authentication/auth.routes";
import {Pages} from "@app/data/pages";
import {dashboardRoutes} from "@app/components/dashboards/dashboard.routes";
import {HomeComponent} from "@app/components/home/home.component";
import {vehicleRoutes} from "@app/components/vehicle/vehicle.routes";
import {personRoutes} from "@app/components/person/person.routes";
import {pieceRoutes} from "@app/components/piece/piece.routes";
import {transactionRoutes} from "@app/components/transaction/transaction.routes";

const routes: Routes = [
  ...authRoutes,
  ...dashboardRoutes,
  ...vehicleRoutes,
  ...personRoutes,
  ...pieceRoutes,
  ...transactionRoutes,
  { path: Pages.HOME, component: HomeComponent },
  { path: '**', redirectTo: Pages.HOME, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
