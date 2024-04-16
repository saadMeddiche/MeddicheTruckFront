import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authRoutes} from "./authentication/auth.routes";

const routes: Routes = [
  ...authRoutes,
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
