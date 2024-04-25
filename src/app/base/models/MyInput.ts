import {InputType} from "@app/base/enums/InputType";
import {BaseModel} from "@app/base/models/BaseModel";

export interface MyInput<I extends BaseModel> {
  name: string;
  label: string;
  type: InputType;
  value?: (item: I) => any;
  placeholder?: (item: I) => string;
  options?: any[];
  multiple?: boolean;
  validationMessage?: () => string;
}
