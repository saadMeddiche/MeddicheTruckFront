import {PieceImage} from "./PieceImage";

export interface Piece{
  id: number;
  name : string;
  images: PieceImage[] ;
}
