import {PieceImage} from "./PieceImage";
import {BaseModel} from "../../base/models/BaseModel";

export interface Piece extends BaseModel {
  name : string;
  images: PieceImage[] ;
}
