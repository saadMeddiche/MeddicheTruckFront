import {Routes} from "@angular/router";
import {AccessAuthenticationPanelsGuard} from "@app/authentication/guards/access-authentication-panels.guard";
import {SignupComponent} from "./components/signup/signup.component";
import {LogInComponent} from "@app/authentication/components/log-in/core/log-in.component";

export const authRoutes: Routes = [
  { path: 'logIn', component: LogInComponent , canActivate:[AccessAuthenticationPanelsGuard] },
  { path: 'signup', component: SignupComponent ,canActivate:[AccessAuthenticationPanelsGuard]},
];
