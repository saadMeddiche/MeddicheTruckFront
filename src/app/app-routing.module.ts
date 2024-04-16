import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authRoutes} from "./authentication/auth.routes";
import {Pages} from "@app/configurations/pages";

const routes: Routes = [
  ...authRoutes,
  { path: '**', redirectTo: Pages.HOME, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
