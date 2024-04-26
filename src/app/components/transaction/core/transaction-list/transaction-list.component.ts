import {Component, ViewChild} from '@angular/core';
import {BaseAddComponent} from "@app/base/core/base-add/base-add.component";
import {BaseUpdateComponent} from "@app/base/core/base-update/base-update.component";
import {BaseDeleteComponent} from "@app/base/core/base-delete/base-delete.component";
import {BaseListComponent} from "@app/base/core/base-list/base-list.component";
import {Transaction} from "@app/components/transaction/models/transaction";
import {TransactionService} from "@app/components/transaction/services/transaction.service";
import {ValidationService} from "@app/base/services/validation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Column} from "@app/base/models/Column";
import {ColumnType} from "@app/base/enums/ColumnType";
import {MyInput} from "@app/base/models/MyInput";
import {InputType} from "@app/base/enums/InputType";
import {Router} from "@angular/router";
import { Location} from "@angular/common";
import {ID} from "@app/types/GeneralTypes";
import {TransactionType} from "@app/components/transaction/enums/TransactionType";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent extends ValidationService {

  @ViewChild(BaseAddComponent)
  baseAddComponent!: BaseAddComponent<Transaction, TransactionService>;

  @ViewChild(BaseUpdateComponent)
  baseUpdateComponent!: BaseUpdateComponent<Transaction, TransactionService>;

  @ViewChild(BaseDeleteComponent)
  baseDeleteComponent!: BaseDeleteComponent<Transaction, TransactionService>;

  @ViewChild(BaseListComponent)
  baseListComponent!: BaseListComponent<Transaction, TransactionService>;

  constructor(protected transactionService: TransactionService,
              override router: Router,
              override location: Location) {
    super(router , location);
  }


  columns : Column<Transaction>[] = [
    {
      name: 'name',
      label: 'Name' ,
      type: ColumnType.TEXT,
      value: (item: Transaction) => item.name
    },
    {
      name: 'description',
      label: 'Description',
      type: ColumnType.TEXTAREA,
      value: (item: Transaction) => item.description
    },
    {
      name: 'timeTransaction',
      label: 'Time Transaction',
      type: ColumnType.TEXT,
      value: (item: Transaction) => item.timeTransaction
    },
    {
      name: 'type',
      label: 'Type',
      type: ColumnType.TEXT,
      value: (item: Transaction) => item.type
    }
  ]

  inputs: MyInput<Transaction>[] = [

    {
      name: 'name',
      label: 'Name',
      type: InputType.TEXT,
      validationMessage: () => this.getErrorName('name')
    },
    {
      name: 'type',
      label: 'Type',
      type: InputType.SELECT,
      options: Object.values(TransactionType),
      validationMessage: () => this.getErrorName('type')
    },
    {
      name: 'timeTransaction',
      label: 'Time Transaction',
      type: InputType.DATETIME,
      validationMessage: () => this.getErrorName('timeTransaction')
    },
    {
      name: 'description',
      label: 'Description',
      type: InputType.TEXTAREA,
      validationMessage: () => this.getErrorName('description')
    },
  ]

  override buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      timeTransaction: new FormControl('', [Validators.required]),
      type: new FormControl(TransactionType.BUYING, [Validators.required])
    });
  }

  addTransaction(){
    this.baseAddComponent.toggleModal();
  }

  editTransaction(vehicleId :ID){
    console.log(vehicleId);
    this.baseUpdateComponent.startUpdateProcess(vehicleId);
  }

  deleteTransaction(vehicleId :ID){
    this.baseDeleteComponent.startDeleteProcess(vehicleId);
  }

  refreshList(){
    this.baseListComponent.searchItems();
  }
}
