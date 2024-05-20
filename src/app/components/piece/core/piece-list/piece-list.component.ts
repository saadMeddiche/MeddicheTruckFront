import {Component, ViewChild} from '@angular/core';
import {BaseAddComponent} from "@app/base/core/base-add/base-add.component";
import {Vehicle} from "@app/components/vehicle/models/vehicle";
import {VehicleService} from "@app/components/vehicle/services/vehicle.service";
import {BaseUpdateComponent} from "@app/base/core/base-update/base-update.component";
import {BaseDeleteComponent} from "@app/base/core/base-delete/base-delete.component";
import {BaseListComponent} from "@app/base/core/base-list/base-list.component";
import {Piece} from "@app/components/piece/models/piece";
import {PieceService} from "@app/components/piece/services/piece.service";
import {Router} from "@angular/router";
import {ID} from "@app/types/GeneralTypes";
import {Location} from "@angular/common";
import {RowButton} from "@app/base/models/RowButton";
import {PieceTransaction} from "@app/components/piece-transaction/models/PieceTransaction";
import {PieceTransactionService} from "@app/components/piece-transaction/services/piece-transaction.service";
import {NavigationService} from "@app/base/services/navigation.service";
import {PieceForms} from "@app/components/piece/data/PieceForms";
import {PieceExtraRowButton, PieceList} from "@app/components/piece/data/PieceList";

@Component({
  selector: 'app-piece-list',
  templateUrl: './piece-list.component.html',
  styleUrl: './piece-list.component.scss'
})
export class PieceListComponent  extends NavigationService {

  @ViewChild(BaseAddComponent)
  baseAddComponent!: BaseAddComponent<Piece, PieceService>;

  @ViewChild('Transactions')
  baseAddTransactionComponent!: BaseAddComponent<PieceTransaction, PieceTransactionService>;

  @ViewChild(BaseUpdateComponent)
  baseUpdateComponent!: BaseUpdateComponent<Vehicle, VehicleService>;

  @ViewChild(BaseDeleteComponent)
  baseDeleteComponent!: BaseDeleteComponent<Vehicle, VehicleService>;

  @ViewChild(BaseListComponent)
  baseListComponent!: BaseListComponent<Vehicle, VehicleService>;

  constructor(
    protected pieceService: PieceService,
    override router: Router,
    override location: Location,
    protected pieceTransactionService: PieceTransactionService,
    protected pieceForms: PieceForms,
    protected pieceList: PieceList
  ) {
    super(router, location);
  }

  addButtonIsClicked(){
    this.baseAddComponent.toggleModal();
  }

  editButtonIsClicked(vehicleId :ID){
    this.baseUpdateComponent.startUpdateProcess(vehicleId);
  }

  deleteButtonIsClicked(vehicleId :ID){
    this.baseDeleteComponent.startDeleteProcess(vehicleId);
  }

  refreshList(){
    this.baseListComponent.searchItems();
  }

  extraButtonIsClicked(button: RowButton<Piece>){

    // Define the action for the clicked button

    switch (button.id) {
      case PieceExtraRowButton.PIECE_ADD_TRANSACTION:
        this.pieceForms.transactionForm.get('pieceId')!.setValue(button.item?.id);
        this.baseAddTransactionComponent.toggleModal();
        break;
      case PieceExtraRowButton.PIECE_TRANSACTIONS:
        alert("see transaction")
        break;
    }

  }
}
