import {BaseModel, IBaseModel} from "@app/base/models/BaseModel";

export interface IPiece extends IBaseModel {
  name: string;
  inStock: boolean;
}

export class Piece extends BaseModel {

  private _name: string;
  private _inStock: boolean;

  constructor(piece: IPiece) {
    super(piece);
    this._name = piece.name;
    this._inStock = piece.inStock;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name ? name : 'Piece';
  }

  get inStock(): boolean {
    return this._inStock;
  }

  set inStock(inStock: boolean) {
    this._inStock = inStock;
  }

}
