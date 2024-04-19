import {IBaseModel} from "./BaseModel";
import {SemiString} from "@app/types/GeneralTypes";

export interface BaseImage extends IBaseModel
{
  name : string;
  photoInBase64Format : SemiString;
  photoPath : SemiString;
}
