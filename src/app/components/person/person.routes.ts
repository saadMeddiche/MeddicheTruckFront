import {Routes} from "@angular/router";
import {Pages} from "@app/data/pages";
import {PersonListComponent} from "@app/components/person/core/person-list/person-list.component";
import {AuthGuard} from "@app/authentication/guards/auth.guard";

export const personRoutes: Routes = [
  {
    path: Pages.PERSONS_LIST,
    component: PersonListComponent,
    canActivate:[AuthGuard]
  }
]
