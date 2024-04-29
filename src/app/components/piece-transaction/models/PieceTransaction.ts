import {BaseModel, IBaseModel} from "@app/base/models/BaseModel";
import {Time} from "@angular/common";
import {TransactionType} from "@app/components/piece-transaction/enums/TransactionType";

export interface IPieceTransaction extends IBaseModel {

  date: Date;

  time: Time;

  description: string;

  type: TransactionType;

  pieceID: number;

  personID: number;

  price: number;
}

export class PieceTransaction extends BaseModel {

  private _date: Date;

  private _time: Time;

  private _description: string;

  private _type: TransactionType;

  private _pieceID: number;

  private _personID: number;

  private _price: number;

  constructor(pieceTransaction: IPieceTransaction) {
    super(pieceTransaction);
    this._date = pieceTransaction.date;
    this._time = pieceTransaction.time;
    this._description = pieceTransaction.description;
    this._type = pieceTransaction.type;
    this._pieceID = pieceTransaction.pieceID;
    this._personID = pieceTransaction.personID;
    this._price = pieceTransaction.price;
  }

  get date(): Date {
    return this._date;
  }

  set date(date: Date) {
    this._date = date;
  }

  get time(): Time {
    return this._time;
  }

  set time(time: Time) {
    this._time = time;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get type(): TransactionType {
    return this._type;
  }

  set type(type: TransactionType) {
    this._type = type;
  }

  get pieceID(): number {
    return this._pieceID;
  }

  set pieceID(pieceID: number) {
    this._pieceID = pieceID;
  }

  get personID(): number {
    return this._personID;
  }

  set personID(personID: number) {
    this._personID = personID;
  }

  get price(): number {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }


}
