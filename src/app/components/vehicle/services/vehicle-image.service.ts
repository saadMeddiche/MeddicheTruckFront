import { Injectable } from '@angular/core';
import {VehicleReceivedImage} from "@app/components/vehicle/models/VehicleReceivedImage";
import {HttpClient} from "@angular/common/http";
import {BaseImageService} from "@app/base/services/base-image.service";
import {VehicleSentImage} from "@app/components/vehicle/models/VehicleSentImage";

@Injectable({
  providedIn: 'root'
})
export class VehicleImageService extends BaseImageService<VehicleReceivedImage , VehicleSentImage> {

  override key: string = 'vehicleImages';
  constructor(
    override http: HttpClient
  ) {
    super(http);
  }
}
