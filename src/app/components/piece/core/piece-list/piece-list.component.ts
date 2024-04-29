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
import {ValidationService} from "@app/base/services/validation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ColumnType} from "@app/base/enums/ColumnType";
import {Column} from "@app/base/models/Column";
import {MyInput} from "@app/base/models/MyInput";
import {InputType} from "@app/base/enums/InputType";
import {noSpaceValidator} from "@app/base/validation/costum-validators/costum.validators";
import {ID} from "@app/types/GeneralTypes";
import {Location} from "@angular/common";
import {RowButton} from "@app/base/models/RowButton";
import {PieceTransaction} from "@app/components/piece-transaction/models/PieceTransaction";
import {PieceTransactionService} from "@app/components/piece-transaction/services/piece-transaction.service";
import {getErrorMessageForName} from "@app/base/validation/error-messages/error.messages";
import {TransactionType} from "@app/components/piece-transaction/enums/TransactionType";
import {PersonService} from "@app/components/person/services/person.service";

@Component({
  selector: 'app-piece-list',
  templateUrl: './piece-list.component.html',
  styleUrl: './piece-list.component.scss'
})
export class PieceListComponent  extends ValidationService {

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
    protected personService: PersonService
  ) {
    super(router, location);
  }

  columns : Column<Piece>[] = [
    {
      name: 'name',
      label: 'Name' ,
      type: ColumnType.TEXT,
      value: (item: Piece) => item.name
    },
    {
      name: 'inStock',
      label: 'In Stock',
      type: ColumnType.BOOLEAN,
      value: (item: Piece) => item.inStock
    },
    {
      name:'image',
      label: 'Images',
      type: ColumnType.IMAGE,
      value: (_item: Piece) => "images",
      function: (item: Piece) => this.navigateToPieceImages(item.id)
    }
  ]

  inputs: MyInput<Piece>[] = [
    {
      name: 'name',
      label: 'Name',
      type: InputType.TEXT,
      validationMessage: () => this.getErrorName('name')
    },
    {
      name: 'inStock',
      label: 'In Stock',
      type: InputType.CHECKBOX,
      validationMessage: () => this.getErrorName('inStock')
    }
  ]

  buildTransactionForm(): FormGroup {
    return new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      description: new FormControl('Default description', [Validators.required]),
      type: new FormControl(TransactionType.BUY, [Validators.required]),
      pieceId: new FormControl('', [Validators.required]),
      personId: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  transactionForm: FormGroup = this.buildTransactionForm();

  transactionInputs: MyInput<PieceTransaction>[] = [
    {
      idPrefix: 'PT',
      name: 'date',
      label: 'Date',
      type: InputType.DATE,
      validationMessage: () => getErrorMessageForName('date', this.transactionForm)
    },
    {
      idPrefix: 'PT',
      name: 'time',
      label: 'Time',
      type: InputType.TIME,
      validationMessage: () => getErrorMessageForName('time', this.transactionForm)
    },
    {
      idPrefix: 'PT',
      name: 'type',
      label: 'Type',
      type: InputType.SELECT,
      validationMessage: () => getErrorMessageForName('type', this.transactionForm),
      options: Object.values(TransactionType)
    },
    {
      idPrefix: 'PT',
      name: 'pieceId',
      label: 'Piece ID',
      type: InputType.NUMBER,
      validationMessage: () => getErrorMessageForName('pieceId', this.transactionForm)
    },
    {
      idPrefix: 'PT',
      name: 'personId',
      label: 'Person ID',
      type: InputType.NUMBER,
      validationMessage: () => getErrorMessageForName('personId', this.transactionForm)
    },
    {
      idPrefix: 'PT',
      name: 'price',
      label: 'Price',
      type: InputType.NUMBER,
      validationMessage: () => getErrorMessageForName('price', this.transactionForm)
    },
    {
      idPrefix: 'PT',
      name: 'description',
      label: 'Description',
      type: InputType.TEXTAREA,
      validationMessage: () => getErrorMessageForName('description', this.transactionForm)
    },
  ]

  extraRowButtons :RowButton<Piece>[] = [
    {
      id: 'pieceTransaction',
      type: 'button',
      name: 'Transaction',
      class: 'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-900',
    }
  ]

  override buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        noSpaceValidator()
      ]),
      inStock: new FormControl(true, [
        Validators.required
      ])
    });
  }

  addPiece(){
    this.baseAddComponent.toggleModal();
  }

  editPiece(vehicleId :ID){
    console.log(vehicleId);
    this.baseUpdateComponent.startUpdateProcess(vehicleId);
  }

  deletePiece(vehicleId :ID){
    this.baseDeleteComponent.startDeleteProcess(vehicleId);
  }

  refreshList(){
    this.baseListComponent.searchItems();
  }

  extraButton(button: RowButton<Piece>){

    switch (button.id) {
      case 'pieceTransaction':
        this.transactionForm.get('pieceId')!.setValue(button.item?.id);
        this.baseAddTransactionComponent.toggleModal();
        break;
    }

  }
}
