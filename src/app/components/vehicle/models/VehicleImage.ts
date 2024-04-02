import {BaseImage} from "../../base/models/BaseImage";
import {Vehicle} from "./Vehicle";
import {ID} from "../../../types/entities";

export interface VehicleImage extends BaseImage {
  vehicle :{
    id: ID;
  };
}
