import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from "./authentication/components/signin/signin.component";
import {SignupComponent} from "./authentication/components/signup/signup.component";
import {UserDashboardComponent} from "./user-dashboard/user-dashboard.component";
import {AuthGuard} from "./authentication/guards/auth.guard";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AccessUserDashboardGuard} from "./authentication/guards/access-user-dashboard.guard";
import {AccessAdminDashboardGuard} from "./authentication/guards/access-admin-dashboard.guard";

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'userDashboard', component: UserDashboardComponent, canActivate: [AuthGuard , AccessUserDashboardGuard] },
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard , AccessAdminDashboardGuard] },
  { path: '', redirectTo: '/signin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
