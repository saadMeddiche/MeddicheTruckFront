import { Injectable } from '@angular/core';
import {BaseService} from "../../base/services/base.service";
import {Vehicle} from "../models/Vehicle";

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseService<Vehicle, "vehicles">{
  override key: string = "vehicles";
}
