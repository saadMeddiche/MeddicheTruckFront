import {ID, SemiString} from "../../../types/entities";

export interface PieceImage{
  id: ID;
  name : string;
  photoInBase64Format : SemiString;
  photoPath : SemiString;
}
