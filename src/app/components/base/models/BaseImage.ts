import {BaseModel} from "./BaseModel";
import {SemiString} from "../../../types/GeneralTypes";

export interface BaseImage extends BaseModel
{
  name : string;
  photoInBase64Format : SemiString;
  photoPath : SemiString;
}
