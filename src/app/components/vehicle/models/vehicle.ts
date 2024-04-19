import {VehicleType} from "@app/components/vehicle/enums/vehicle.type";
import {EngineType} from "@app/components/vehicle/enums/engine.type";
import {BaseModel, IBaseModel} from "@app/base/models/BaseModel";

export interface IVehicle extends IBaseModel {
  type: VehicleType;
  engineType: EngineType;
  model: string;
  plate: string;
}

export class Vehicle extends BaseModel {

  private _type: VehicleType;

  private _engineType: EngineType;

  private _model: string;

  private _plate: string;

  constructor(vehicle: IVehicle) {
    super(vehicle);
    this._type = vehicle.type;
    this._engineType = vehicle.engineType;
    this._model = vehicle.model;
    this._plate = vehicle.plate;
  }

  get type(): VehicleType {
    return this._type;
  }

  set type(type: VehicleType) {
    this._type = type ? type : VehicleType.CAR;
  }

  get engineType(): EngineType {
    return this._engineType;
  }

  set engineType(engineType: EngineType) {
    this._engineType = engineType ? engineType : EngineType.FUEL;
  }

  get model(): string {
    return this._model;
  }

  set model(model: string) {
    this._model = model ? model : '0000';
  }

  get plate(): string {
    return this._plate;
  }

  set plate(plate: string) {
    this._plate = plate ? plate : 'ABCD 0000';
  }

}
