
import {SemiString} from "@app/types/GeneralTypes";
import {BaseModel, IBaseModel} from "@app/base/models/BaseModel";

export interface IBaseSentImage extends IBaseModel
{
  name : string;
  photoInBase64Format : SemiString;
}


export class BaseSentImage extends BaseModel{

  private _name: string;
  private _photoInBase64Format: SemiString;

  constructor(baseImage: IBaseSentImage) {
    super(baseImage);
    this._name = baseImage.name;
    this._photoInBase64Format = baseImage.photoInBase64Format;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get photoInBase64Format(): SemiString {
    return this._photoInBase64Format;
  }

  set photoInBase64Format(photoInBase64Format: SemiString) {
    this._photoInBase64Format = photoInBase64Format;
  }

}
