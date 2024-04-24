
import {SemiString} from "@app/types/GeneralTypes";
import {BaseModel, IBaseModel} from "@app/base/models/BaseModel";

export interface IBaseReceivedImage extends IBaseModel
{
  name : string;
  photoPath : SemiString;
}

export class BaseReceivedImage extends BaseModel {

  private _name: string;
  private _photoPath: SemiString;

  constructor(baseImage: IBaseReceivedImage) {
    super(baseImage);
    this._name = baseImage.name;
    this._photoPath = baseImage.photoPath;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get photoPath(): SemiString {
    return this._photoPath;
  }

  set photoPath(photoPath: SemiString) {
    this._photoPath = photoPath;
  }

  public toJSON(): IBaseReceivedImage {
    return {
      id: this.id,
      name: this.name,
      photoPath: this.photoPath
    }
  }
}
