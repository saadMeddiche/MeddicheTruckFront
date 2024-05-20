import {Routes} from "@angular/router";
import {AccessAuthenticationPanelsGuard} from "@app/authentication/guards/access-authentication-panels.guard";
import {LogInComponent} from "@app/authentication/core/log-in/log-in.component";
import {RegisterComponent} from "@app/authentication/core/register/register.component";
import {Pages} from "@app/data/pages";

export const authRoutes: Routes = [
  { path: Pages.LOG_IN, component: LogInComponent , canActivate:[AccessAuthenticationPanelsGuard] },
  { path: Pages.REGISTER, component: RegisterComponent ,canActivate:[AccessAuthenticationPanelsGuard]},
];
