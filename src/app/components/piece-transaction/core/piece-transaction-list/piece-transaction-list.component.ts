import {Component, ViewChild} from '@angular/core';
import {BaseUpdateComponent} from "@app/base/core/base-update/base-update.component";
import {BaseDeleteComponent} from "@app/base/core/base-delete/base-delete.component";
import {BaseListComponent} from "@app/base/core/base-list/base-list.component";
import {PieceTransactionService} from "@app/components/piece-transaction/services/piece-transaction.service";
import {PieceTransaction} from "@app/components/piece-transaction/models/PieceTransaction";
import {ID} from "@app/types/GeneralTypes";
import {PieceTransactionForms} from "@app/components/piece-transaction/data/PieceTransactionForms";
import {PieceTransactionList} from "@app/components/piece-transaction/data/PieceTransactionList";

@Component({
  selector: 'app-piece-transaction-list',
  templateUrl: './piece-transaction-list.component.html',
  styleUrl: './piece-transaction-list.component.scss'
})
export class PieceTransactionListComponent {

  @ViewChild(BaseUpdateComponent)
  baseUpdateComponent!: BaseUpdateComponent<PieceTransaction, PieceTransactionService>;

  @ViewChild(BaseDeleteComponent)
  baseDeleteComponent!: BaseDeleteComponent<PieceTransaction, PieceTransactionService>;

  @ViewChild(BaseListComponent)
  baseListComponent!: BaseListComponent<PieceTransaction, PieceTransactionService>;

  constructor(
    protected pieceTransactionService: PieceTransactionService,
    protected pieceTransactionForm: PieceTransactionForms,
    protected pieceTransactionList: PieceTransactionList
  ) {}

  editButtonIsClicked(vehicleId :ID){
    this.baseUpdateComponent.startUpdateProcess(vehicleId);
  }

  deleteButtonIsClicked(vehicleId :ID){
    this.baseDeleteComponent.startDeleteProcess(vehicleId);
  }

  refreshList(){
    this.baseListComponent.searchItems();
  }
}
