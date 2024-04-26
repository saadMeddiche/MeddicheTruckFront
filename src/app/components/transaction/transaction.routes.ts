import {Routes} from "@angular/router";
import {Pages} from "@app/data/pages";
import {TransactionListComponent} from "@app/components/transaction/core/transaction-list/transaction-list.component";
import {AuthGuard} from "@app/authentication/guards/auth.guard";

export const transactionRoutes: Routes = [
  {
    path:Pages.TRANSACTIONS_LIST,
    component: TransactionListComponent,
    canActivate: [AuthGuard],
  }
]
