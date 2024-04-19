import {VehicleType} from "@app/components/vehicle/enums/vehicle.type";
import {EngineType} from "@app/components/vehicle/enums/engine.type";
import {AutoGetterSetter} from "@app/base/devorators/AutoGetterSetter";
import {BaseModel, IBaseModel} from "@app/base/models/BaseModel";

export interface IVehicle extends IBaseModel {
  type: VehicleType;
  engineType: EngineType;
  model: string;
  plate: string;
}

export class Vehicle extends BaseModel{

  @AutoGetterSetter
  private type: VehicleType;

  @AutoGetterSetter
  private engineType: EngineType;

  @AutoGetterSetter
  private model: string;

  @AutoGetterSetter
  private plate: string;

  constructor(vehicle: IVehicle) {
    super(vehicle);
    this.type = vehicle.type;
    this.engineType = vehicle.engineType;
    this.model = vehicle.model;
    this.plate = vehicle.plate;
  }

  // get id(): ID {
  //   return this._id;
  // }
  //
  // set id(id: ID) {
  //   this._id = id;
  // }
  //
  // get type(): VehicleType {
  //   return this._type;
  // }
  //
  // set type(type: VehicleType) {
  //   this._type = type;
  // }
  //
  // get engineType(): EngineType {
  //   return this._engineType;
  // }
  //
  // set engineType(engineType: EngineType) {
  //   this._engineType = engineType;
  // }
  //
  // get model(): string {
  //   return this._model;
  // }
  //
  // set model(model: string) {
  //   this._model = model;
  // }
  //
  // get plate(): string {
  //   return this._plate;
  // }
  //
  // set plate(plate: string) {
  //   this._plate = plate;
  // }

}
