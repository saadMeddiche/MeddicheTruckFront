import {BaseModel} from "@app/base/models/BaseModel";

export interface RowButton<I extends BaseModel> {
  id:string;
  type: string;
  name: string;
  class: string;
  onClick?: () => void;
  item?: I;
}
