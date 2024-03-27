import { Component } from '@angular/core';
import {Vehicle} from "../../models/Vehicle";
import {PopupService} from "../../../popup/services/popup.service";
import {BaseAddComponent} from "../../../base/base-add/base-add.component";
import {Router} from "@angular/router";
import {VehicleService} from "../../services/vehicle.service";
import {VehicleType} from "../../enums/VehicleType";
import {EngineType} from "../../enums/EngineType";

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrl: './vehicle-add.component.scss'
})
export class VehicleAddComponent extends BaseAddComponent<Vehicle, "vehicles", VehicleService> {

  constructor(
    override itemService: VehicleService,
    override popup: PopupService,
    override router: Router
  ) {
    super(itemService, popup, router);
  }

  initializeItem(): Vehicle {
    return {
      id: null,
      type: VehicleType.CAR,
      engineType: EngineType.DIESEL,
      model: "",
      plate: "",
      images: []
    };
  }

  protected readonly Object = Object;
  protected readonly VehicleType = VehicleType;
  protected readonly EngineType = EngineType;
}
