import {BaseModel} from "@app/base/models/BaseModel";
import {ColumnType} from "@app/base/enums/ColumnType";

export interface Column<I extends BaseModel>{
  name: string;
  label: string;
  type: ColumnType;
  value: (item :I) => any;
  function?: (item: I) => void;
}
