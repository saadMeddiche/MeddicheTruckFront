import {Routes} from "@angular/router";
import {Pages} from "@app/data/pages";
import {PieceListComponent} from "@app/components/piece/core/piece-list/piece-list.component";
import {AuthGuard} from "@app/authentication/guards/auth.guard";
import {PieceImageComponent} from "@app/components/piece/core/piece-image/piece-image.component";

export const pieceRoutes: Routes = [
  {
    path: Pages.PIECES_LIST,
    component: PieceListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Pages.PIECES_IMAGES,
    component: PieceImageComponent,
    canActivate: [AuthGuard]
  }
]
