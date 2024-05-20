import {Routes} from "@angular/router";
import {ProfileComponent} from "@app/components/profile/core/profile.component";
import {AuthGuard} from "@app/authentication/guards/auth.guard";
import {Pages} from "@app/data/pages";

export const profileRoutes: Routes = [
  {
    path: Pages.PROFILE,
    component: ProfileComponent,
    canActivate: [AuthGuard],
  }
];
