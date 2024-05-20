import {Routes} from "@angular/router";
import {Pages} from "@app/data/pages";
import {AuthGuard} from "@app/authentication/guards/auth.guard";
import {
  PieceTransactionListComponent
} from "@app/components/piece-transaction/core/piece-transaction-list/piece-transaction-list.component";

export const pieceTransactionRoutes: Routes = [
  {
    path:Pages.PIECE_TRANSACTIONS_LIST,
    component: PieceTransactionListComponent,
    canActivate: [AuthGuard],
  }
]
