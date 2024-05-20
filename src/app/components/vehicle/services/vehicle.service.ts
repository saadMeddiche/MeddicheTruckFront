import { Injectable } from '@angular/core';
import {BaseService} from "@app/base/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Vehicle} from "@app/components/vehicle/models/vehicle";

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseService<Vehicle>{

  override key: string = 'vehicles';
  constructor(override http: HttpClient) {
    super(http);
  }

}
