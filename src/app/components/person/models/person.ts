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

  get firstName(): string {
    return this._firstName;
  }

  set firstName(firstName: string) {
    this._firstName = firstName ? firstName : 'John';
  }

  get middleName(): string {
    return this._middleName;
  }

  set middleName(middleName: string) {
    this._middleName = middleName ? middleName : 'Doe';
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(lastName: string) {
    this._lastName = lastName ? lastName : 'Smith';
  }

  get birthDate(): Date {
    return this._birthDate;
  }

  set birthDate(birthDate: Date) {
    this._birthDate = birthDate ? birthDate : new Date();
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description ? description : 'This is a default description. Here you can add more information about the person.';
  }
}
