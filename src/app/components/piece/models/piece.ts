import {BaseModel, IBaseModel} from "@app/base/models/BaseModel";

export interface IPiece extends IBaseModel {
  name: string;
}

export class Piece extends BaseModel {

  private _name: string;

  constructor(piece: IPiece) {
    super(piece);
    this._name = piece.name;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name ? name : 'Piece';
  }

}
