import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {SemiString} from "@app/types/GeneralTypes";
import { v4 as uuidV4 } from 'uuid';

export interface IToast {
  uuid: SemiString;
  message: string;
  type: ToastType;
}

export class Toast implements IToast {
  public uuid: SemiString;
  public message: string;
  public type: ToastType;

  constructor(message: string, type: ToastType) {
    this.uuid = uuidV4()
    this.message = message;
    this.type = type;
  }
}
