import {PieceImage} from "./PieceImage";
import {ID} from "../../../types/entities";

export interface Piece{
  id: ID;
  name : string;
  images: PieceImage[] ;
}
