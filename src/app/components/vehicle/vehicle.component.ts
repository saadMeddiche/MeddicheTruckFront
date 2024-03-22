import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent {
  constructor(private router :Router) { }
  async goToVehicleList(){
    await this.router.navigate(['vehicles/list']);
  }
}
