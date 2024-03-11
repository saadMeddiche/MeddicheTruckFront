import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {pieceRoutes} from "./components/piece/piece.routes";
import {authRoutes} from "./authentication/auth.routes";

const routes: Routes = [
  { path: '', component: HomeComponent },
  ...pieceRoutes,
  ...authRoutes,
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
