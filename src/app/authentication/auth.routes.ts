import {Routes} from "@angular/router";
import {SigninComponent} from "./components/signin/signin.component";
import {AccessAuthenticationPanelsGuard} from "./guards/access-authentication-panels.guard";
import {SignupComponent} from "./components/signup/signup.component";
import {UserDashboardComponent} from "../components/dashboards/user-dashboard/user-dashboard.component";
import {AuthGuard} from "./guards/auth.guard";
import {AccessUserDashboardGuard} from "./guards/access-user-dashboard.guard";
import {AdminDashboardComponent} from "../components/dashboards/admin-dashboard/admin-dashboard.component";
import {AccessAdminDashboardGuard} from "./guards/access-admin-dashboard.guard";

export const authRoutes: Routes = [
  { path: 'signin', component: SigninComponent , canActivate:[AccessAuthenticationPanelsGuard] },
  { path: 'signup', component: SignupComponent ,canActivate:[AccessAuthenticationPanelsGuard]},
  { path: 'userDashboard', component: UserDashboardComponent, canActivate: [AuthGuard , AccessUserDashboardGuard] },
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard , AccessAdminDashboardGuard] },
];
