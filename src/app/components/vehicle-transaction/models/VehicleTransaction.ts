import {BaseModel, IBaseModel} from "@app/base/models/BaseModel";
import {Time} from "@angular/common";
import {TransactionType} from "@app/components/vehicle-transaction/enums/TransactionType";

export interface IVehicleTransaction extends IBaseModel {

  date: Date;

  time: Time;

  description: string;

  type: TransactionType;

  vehicleId: number;

  personId: number;

  price: number;
}

export class VehicleTransaction extends BaseModel {

  private _date: Date;

  private _time: Time;

  private _description: string;

  private _type: TransactionType;

  private _vehicleId: number;

  private _personId: number;

  private _price: number;

  constructor(vehicleTransaction: IVehicleTransaction) {
    super(vehicleTransaction);
    this._date = vehicleTransaction.date;
    this._time = vehicleTransaction.time;
    this._description = vehicleTransaction.description;
    this._type = vehicleTransaction.type;
    this._vehicleId = vehicleTransaction.vehicleId;
    this._personId = vehicleTransaction.personId;
    this._price = vehicleTransaction.price;
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

  get vehicleId(): number {
    return this._vehicleId;
  }

  set vehicleId(vehicleID: number) {
    this._vehicleId = vehicleID;
  }

  get personId(): number {
    return this._personId;
  }

  set personId(personID: number) {
    this._personId = personID;
  }

  get price(): number {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }


}
