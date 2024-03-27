import {Component} from '@angular/core';
import {Vehicle} from "../../models/Vehicle";
import {BaseUpdateComponent} from "../../../base/base-update/base-update.component";
import {VehicleService} from "../../services/vehicle.service";
import {AuthService} from "../../../../authentication/services/auth.service";
import {PopupService} from "../../../popup/services/popup.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VehicleType} from "../../enums/VehicleType";
import {EngineType} from "../../enums/EngineType";

@Component({
  selector: 'app-vehicle-update',
  templateUrl: './vehicle-update.component.html',
  styleUrl: './vehicle-update.component.scss'
})
export class VehicleUpdateComponent extends BaseUpdateComponent<Vehicle, "vehicles", VehicleService>{

  constructor(override itemService: VehicleService,
              override popupService: PopupService,
              override activatedRoute: ActivatedRoute,
              override router: Router,
              override authService: AuthService) {
    super(itemService, popupService, activatedRoute, router, authService);
  }

  initializeItem(): Vehicle {
    return {
      id: null,
      type: VehicleType.CAR,
      engineType: EngineType.DIESEL,
      model: '',
      plate: '',
      images: []
    };
  }

  // This is a workaround for the lack of enums in Angular templates
  protected readonly Object = Object;
  protected readonly VehicleType = VehicleType;
  protected readonly EngineType = EngineType;
}
