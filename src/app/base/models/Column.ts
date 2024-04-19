import {BaseModel} from "@app/base/models/BaseModel";

export interface Column<I extends BaseModel>{
  name: string;
  label: string;
  type: string;
  value: (item :I) => any;
}
