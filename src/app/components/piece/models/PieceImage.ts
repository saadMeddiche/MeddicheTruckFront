import {SemiString} from "../../../types/entities";
import {BaseModel} from "../../base/models/BaseModel";

export interface PieceImage extends BaseModel{
  name : string;
  photoInBase64Format : SemiString;
  photoPath : SemiString;
}
