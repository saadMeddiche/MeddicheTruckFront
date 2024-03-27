import { Component } from '@angular/core';
import {BaseListComponent} from "../../../base/base-list/base-list.component";
import {Piece} from "../../../piece/models/Piece";
import {PieceService} from "../../../piece/services/piece.service";
import {PopupService} from "../../../popup/services/popup.service";
import {Router} from "@angular/router";
import {VehicleService} from "../../services/vehicle.service";
import {Vehicle} from "../../models/Vehicle";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent extends BaseListComponent<Vehicle , "vehicles" , VehicleService>{
  constructor(override itemService: VehicleService ,
              override popup: PopupService,
              override router: Router,
  ) {
    super(itemService ,popup , router);
  }
}
