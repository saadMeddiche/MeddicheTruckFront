import {BaseModel, IBaseModel} from "@app/base/models/BaseModel";

export interface IPerson extends IBaseModel {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  description: string;
}

export class Person extends BaseModel {

  _firstName: string;
  _middleName: string;
  _lastName: string;
  _birthDate: Date;
  _description: string;

  constructor(person: IPerson) {
    super(person);
    this._firstName = person.firstName;
    this._middleName = person.middleName;
    this._lastName = person.lastName;
    this._birthDate = person.birthDate;
    this._description = person.description;
  }

  public fullName(): string {
    console.log(this._firstName);
    console.log(this._middleName);
    console.log(this._lastName);
    return `${this._firstName} ${this._middleName} ${this._lastName}`;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  get middleName(): string {
    return this._middleName;
  }

  set middleName(middleName: string) {
    this._middleName = middleName;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(lastName: string) {
    this._lastName = lastName;
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  set birthDate(birthDate: Date) {
    this._birthDate = birthDate;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }
}
