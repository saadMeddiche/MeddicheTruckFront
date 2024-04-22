import {BaseSentImage, IBaseSentImage} from "@app/base/models/image/BaseSentImage";

export interface IVehicleSentImage extends IBaseSentImage {
  vehicleId: number;
}

export class VehicleSentImage extends BaseSentImage {

  private _vehicleId: number;

  constructor(vehicleImage: IVehicleSentImage) {
    super(vehicleImage);
    this._vehicleId = vehicleImage.vehicleId;
  }

  get vehicleId(): number {
    return this._vehicleId;
  }

  set vehicleId(vehicleId: number) {
    this._vehicleId = vehicleId;
  }

}
