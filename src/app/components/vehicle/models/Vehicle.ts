import {BaseModel} from "../../base/models/BaseModel";
import {VehicleImage} from "./VehicleImage";
import {VehicleType} from "../enums/VehicleType";
import {EngineType} from "../enums/EngineType";

export interface Vehicle extends BaseModel {
  type : VehicleType;
  engineType: EngineType;
  model : string;
  plate : string;
  images: VehicleImage[] ;
}
