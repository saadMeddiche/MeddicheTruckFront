import {BaseReceivedImage, IBaseReceivedImage} from "@app/base/models/image/BaseReceivedImage";

export interface IVehicleReceivedImage extends IBaseReceivedImage {
  vehicleId: number;
}

export class VehicleReceivedImage extends BaseReceivedImage {

  private _vehicleId: number;

  constructor(vehicleImage: IVehicleReceivedImage) {
    super(vehicleImage);
    this._vehicleId = vehicleImage.vehicleId;
  }

  get vehicleId(): number {
    return this._vehicleId;
  }

  set vehicleId(vehicleId: number) {
    this._vehicleId = vehicleId;
  }

  override toJSON(): IVehicleReceivedImage {
    return {
      id: this.id,
      name: this.name,
      photoPath: this.photoPath,
      vehicleId: this.vehicleId
    }
  }

}
