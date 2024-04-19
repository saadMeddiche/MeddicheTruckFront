import {ID} from "@app/types/GeneralTypes";
import {AutoGetterSetter} from "@app/base/devorators/AutoGetterSetter";

export interface IBaseModel{
  id: ID;
}

export class BaseModel {

  @AutoGetterSetter
  protected id: ID;

  constructor(baseModel: IBaseModel) {
    this.id = baseModel.id;
  }
}
