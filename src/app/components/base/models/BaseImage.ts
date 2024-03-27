import {BaseModel} from "./BaseModel";
import {SemiString} from "../../../types/entities";

export interface BaseImage extends BaseModel
{
  name : string;
  photoInBase64Format : SemiString;
  photoPath : SemiString;
}
