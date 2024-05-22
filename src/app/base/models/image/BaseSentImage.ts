import {BaseModel, IBaseModel} from "@app/base/models/BaseModel";

export interface IBaseSentImage extends IBaseModel
{
  name : string;
  photo : File;
  itemName: string;
}

export class BaseSentImage extends BaseModel{

  private _name: string;
  private _photo: File;
  private _itemName: string;

  constructor(baseImage: IBaseSentImage) {
    super(baseImage);
    this._name = baseImage.name;
    this._photo = baseImage.photo
    this._itemName = baseImage.itemName;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get photo(): File {
    return this._photo
  }

  set photo(photo: File) {
    this._photo = photo
  }

  get itemName(): string {
    return this._itemName;
  }

  set itemName(itemName: string) {
    this._itemName = itemName;
  }

}
