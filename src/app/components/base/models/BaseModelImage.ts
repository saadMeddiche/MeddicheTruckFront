import { SemiString} from "../../../types/entities";
import {BaseModel} from "./BaseModel";
import {BaseImage} from "./BaseImage";

export interface BaseModelImage extends BaseModel
{
  images : BaseImage[];
}
