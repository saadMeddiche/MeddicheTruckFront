import {IBaseModel} from "@app/base/models/BaseModel";
import {BaseImage} from "@app/base/models/BaseImage";

export interface BaseModelImage extends IBaseModel
{
  images : BaseImage[];
}
