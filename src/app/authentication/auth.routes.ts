import {Routes} from "@angular/router";
import {SigninComponent} from "./components/signin/signin.component";
import {AccessAuthenticationPanelsGuard} from "./guards/access-authentication-panels.guard";
import {SignupComponent} from "./components/signup/signup.component";

export const authRoutes: Routes = [
  { path: 'signin', component: SigninComponent , canActivate:[AccessAuthenticationPanelsGuard] },
  { path: 'signup', component: SignupComponent ,canActivate:[AccessAuthenticationPanelsGuard]},
];
