import {BaseSentImage, IBaseSentImage} from "@app/base/models/image/BaseSentImage";

export interface IPieceSentImage extends IBaseSentImage {
  pieceId: number;
}

export class PieceSentImage extends BaseSentImage {

    private _pieceId: number;

    constructor(pieceImage: IPieceSentImage) {
      super(pieceImage);
      this._pieceId = pieceImage.pieceId;
    }

    get pieceId(): number {
      return this._pieceId;
    }

    set pieceId(pieceId: number) {
      this._pieceId = pieceId;
    }

}
