import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authRoutes} from "./authentication/auth.routes";
import {Pages} from "@app/configurations/pages";
import {dashboardRoutes} from "@app/components/dashboards/dashboard.routes";

const routes: Routes = [
  ...authRoutes,
  ...dashboardRoutes,
  { path: '**', redirectTo: Pages.HOME, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
