import {ID} from "@app/types/GeneralTypes";
import {AutoGetterSetter} from "@app/base/devorators/AutoGetterSetter";

export interface IBaseModel{
  id: ID;
}

export class BaseModel {

  private _id: ID;

  constructor(baseModel: IBaseModel) {
    this._id = baseModel.id;
  }

  get id(): ID {
    return this._id;
  }

  set id(id: ID) {
    this._id = id;
  }
}
