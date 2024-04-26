import {BaseModel, IBaseModel} from "@app/base/models/BaseModel";
import {TransactionType} from "@app/components/transaction/enums/TransactionType";

export interface ITransaction extends IBaseModel {
  name: string;
  description: string;
  timeTransaction: string;
  type: TransactionType;
}

export class Transaction extends BaseModel {
  _name: string ;
  _description: string;
  _timeTransaction: string;
  _type: TransactionType;

  constructor(transaction: ITransaction) {
    super(transaction);
    this._name = transaction.name;
    this._description = transaction.description;
    this._timeTransaction = transaction.timeTransaction;
    this._type = transaction.type;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get timeTransaction(): string {
    return this._timeTransaction;
  }

  set timeTransaction(timeTransaction: string) {
    this._timeTransaction = timeTransaction;
  }

  get type(): TransactionType {
    return this._type;
  }

  set type(type: TransactionType) {
    this._type = type;
  }


}
