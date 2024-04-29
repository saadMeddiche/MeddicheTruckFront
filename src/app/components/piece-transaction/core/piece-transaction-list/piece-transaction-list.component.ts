import {Component, ViewChild} from '@angular/core';
import {BaseAddComponent} from "@app/base/core/base-add/base-add.component";
import {BaseUpdateComponent} from "@app/base/core/base-update/base-update.component";
import {BaseDeleteComponent} from "@app/base/core/base-delete/base-delete.component";
import {BaseListComponent} from "@app/base/core/base-list/base-list.component";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {PieceTransactionService} from "@app/components/piece-transaction/services/piece-transaction.service";
import {PieceTransaction} from "@app/components/piece-transaction/models/PieceTransaction";
import {Column} from "@app/base/models/Column";
import {ColumnType} from "@app/base/enums/ColumnType";
import {ID} from "@app/types/GeneralTypes";
import {ValidationService} from "@app/base/services/validation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyInput} from "@app/base/models/MyInput";
import {ListConfig} from "@app/base/models/ListConfig";

@Component({
  selector: 'app-piece-transaction-list',
  templateUrl: './piece-transaction-list.component.html',
  styleUrl: './piece-transaction-list.component.scss'
})
export class PieceTransactionListComponent extends ValidationService {


  @ViewChild(BaseAddComponent)
  baseAddComponent!: BaseAddComponent<PieceTransaction, PieceTransactionService>;

  @ViewChild(BaseUpdateComponent)
  baseUpdateComponent!: BaseUpdateComponent<PieceTransaction, PieceTransactionService>;

  @ViewChild(BaseDeleteComponent)
  baseDeleteComponent!: BaseDeleteComponent<PieceTransaction, PieceTransactionService>;

  @ViewChild(BaseListComponent)
  baseListComponent!: BaseListComponent<PieceTransaction, PieceTransactionService>;

  constructor(
    protected pieceTransactionService: PieceTransactionService,
    override router: Router,
    override location: Location
  ) {
    super(router, location);
  }

  override buildForm(): FormGroup {
    return new FormGroup({

      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      pieceID: new FormControl('', [Validators.required]),
      personID: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  config : ListConfig = {
    showAddButton: false,
    showEditButton: false
  }

  inputs: MyInput<PieceTransaction>[] = []

  columns : Column<PieceTransaction>[] = [
    {
      name: 'date',
      label: 'Date' ,
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.date
    },
    {
      name: 'time',
      label: 'Time',
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.time
    },
    {
      name: 'description',
      label: 'Description' ,
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.description
    },
    {
      name: 'type',
      label: 'Type',
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.type
    },
    {
      name: 'pieceID',
      label: 'Piece ID' ,
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.pieceID
    },
    {
      name: 'personID',
      label: 'Person ID',
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.personID
    },
    {
      name: 'price',
      label: 'Price',
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.price
    }
  ]

  addPieceTransaction(){
    this.baseAddComponent.toggleModal();
  }

  editPieceTransaction(vehicleId :ID){
    console.log(vehicleId);
    this.baseUpdateComponent.startUpdateProcess(vehicleId);
  }

  deletePieceTransaction(vehicleId :ID){
    this.baseDeleteComponent.startDeleteProcess(vehicleId);
  }

  refreshList(){
    this.baseListComponent.searchItems();
  }
}
