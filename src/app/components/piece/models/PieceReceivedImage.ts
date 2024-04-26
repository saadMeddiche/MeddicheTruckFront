import {BaseReceivedImage, IBaseReceivedImage} from "@app/base/models/image/BaseReceivedImage";

export interface IPieceReceivedImage extends IBaseReceivedImage {
  pieceId: number;
}

export class PieceReceivedImage extends BaseReceivedImage {

    private _pieceId: number;

    constructor(pieceImage: IPieceReceivedImage) {
      super(pieceImage);
      this._pieceId = pieceImage.pieceId;
    }

    get pieceId(): number {
      return this._pieceId;
    }

    set pieceId(pieceId: number) {
      this._pieceId = pieceId;
    }

    override toJSON(): IPieceReceivedImage {
      return {
        id: this.id,
        name: this.name,
        photoPath: this.photoPath,
        pieceId: this.pieceId
      }
    }
}
