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
import {InputType} from "@app/base/enums/InputType";
import {getErrorMessageForName} from "@app/base/validation/error-messages/error.messages";
import {TransactionType} from "@app/components/piece-transaction/enums/TransactionType";

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
      price: new FormControl('', [Validators.required])
    });
  }

  config : ListConfig = {
    showAddButton: false,
    showEditButton: true
  }

  inputs: MyInput<PieceTransaction>[] = [
    {
      name: 'date',
      label: 'Date',
      type: InputType.DATE,
      validationMessage: () => this.getErrorName('date')
    },
    {
      name: 'time',
      label: 'Time',
      type: InputType.TIME,
      validationMessage: () => this.getErrorName('time')
    },
    {
      name: 'description',
      label: 'Description',
      type: InputType.TEXTAREA,
      validationMessage: () => this.getErrorName('description')
    },
    {
      name: 'type',
      label: 'Type',
      type: InputType.SELECT,
      validationMessage: () => this.getErrorName('type'),
      options: Object.values(TransactionType)
    },
    {
      name: 'price',
      label: 'Price',
      type: InputType.NUMBER,
      validationMessage: () => this.getErrorName('price')
    }
  ]

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
      type: ColumnType.TEXTAREA,
      value: (item: PieceTransaction) => item.description
    },
    {
      name: 'type',
      label: 'Type',
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.type
    },
    {
      name: 'pieceId',
      label: 'Piece' ,
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.pieceId
    },
    {
      name: 'personId',
      label: 'Person',
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.personId
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
