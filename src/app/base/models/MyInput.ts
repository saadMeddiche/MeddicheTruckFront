import {InputType} from "@app/base/enums/InputType";
import {BaseModel} from "@app/base/models/BaseModel";
import {MyOption} from "@app/base/models/MyOption";

export interface MyInput<I extends BaseModel> {
  idPrefix?: string;
  name: string;
  label: string;
  type: InputType;
  value?: (item: I) => any;
  placeholder?: (item: I) => string;
  options?: () => MyOption[];
  multiple?: boolean;
  validationMessage?: () => string;
}
