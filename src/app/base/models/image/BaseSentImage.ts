
import {SemiString} from "@app/types/GeneralTypes";
import {BaseModel, IBaseModel} from "@app/base/models/BaseModel";

export interface IBaseSentImage extends IBaseModel
{
  name : string;
  photoInBase64 : SemiString;
}


export class BaseSentImage extends BaseModel{

  private _name: string;
  private _photoInBase64: SemiString;

  constructor(baseImage: IBaseSentImage) {
    super(baseImage);
    this._name = baseImage.name;
    this._photoInBase64 = baseImage.photoInBase64
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get photoInBase64(): SemiString {
    return this._photoInBase64
  }

  set photoInBase64(photoInBase64: SemiString) {
    this._photoInBase64 = photoInBase64
  }

  toJSON(): IBaseSentImage {
    return {
      id: this.id,
      name: this.name,
      photoInBase64: this.photoInBase64
    }
  }

}
