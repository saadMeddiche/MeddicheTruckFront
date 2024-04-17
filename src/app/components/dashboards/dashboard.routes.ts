import {Routes} from "@angular/router";
import {Pages} from "@app/configurations/pages";
import {UserDashboardComponent} from "@app/components/dashboards/user-dashboard/user-dashboard.component";
import {AccessUserDashboardGuard} from "@app/authentication/guards/access-user-dashboard.guard";
import {AuthGuard} from "@app/authentication/guards/auth.guard";

export const dashboardRoutes: Routes = [
  {path: Pages.USER_DASHBOARD, component: UserDashboardComponent, canActivate: [AuthGuard ,AccessUserDashboardGuard]},
]
