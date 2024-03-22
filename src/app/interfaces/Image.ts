import {ImageType} from "../enums/ImageType";
import {BaseModel} from "../components/base/models/BaseModel";

export interface Image extends BaseModel{
  name: string;
  type: ImageType;
  source: string;
}
