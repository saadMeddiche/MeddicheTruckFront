import {PieceImage} from "./PieceImage";

export interface Piece{
  id: number | null;
  name : string;
  images: PieceImage[] ;
}
