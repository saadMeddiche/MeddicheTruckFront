import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from "./authentication/components/signin/signin.component";
import {SignupComponent} from "./authentication/components/signup/signup.component";
import {UserDashboardComponent} from "./components/user-dashboard/user-dashboard.component";
import {AuthGuard} from "./authentication/guards/auth.guard";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {AccessUserDashboardGuard} from "./authentication/guards/access-user-dashboard.guard";
import {AccessAdminDashboardGuard} from "./authentication/guards/access-admin-dashboard.guard";
import {AccessAuthenticationPanelsGuard} from "./authentication/guards/access-authentication-panels.guard";
import {HomeComponent} from "./components/home/home.component";
import {PieceComponent} from "./components/piece/piece.component";
import {PieceAddComponent} from "./components/piece/components/piece-add/piece-add.component";
import {PieceUpdateComponent} from "./components/piece/components/piece-update/piece-update.component";
import {PieceListComponent} from "./components/piece/components/piece-list/piece-list.component";

const pieceRoutes: Routes = [
  {path: '/pieces' , component: PieceComponent},
  {path: '/pieces/add' , component: PieceAddComponent},
  {path: '/pieces/edit/:id' , component: PieceUpdateComponent},
  {path: '/pieces/list' , component: PieceListComponent}
];

const authRoutes: Routes = [
  { path: 'signin', component: SigninComponent , canActivate:[AccessAuthenticationPanelsGuard] },
  { path: 'signup', component: SignupComponent ,canActivate:[AccessAuthenticationPanelsGuard]},
  { path: 'userDashboard', component: UserDashboardComponent, canActivate: [AuthGuard , AccessUserDashboardGuard] },
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard , AccessAdminDashboardGuard] },
];

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
