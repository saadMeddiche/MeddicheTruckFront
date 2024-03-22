import {BaseModel} from "../../base/models/BaseModel";
import {SemiString} from "../../../types/entities";

export interface VehicleImage extends BaseModel{
  name : string;
  photoInBase64Format : SemiString;
  photoPath : SemiString;
}
