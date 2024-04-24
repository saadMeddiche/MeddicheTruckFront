import { Component } from '@angular/core';
import {VehicleService} from "@app/components/vehicle/services/vehicle.service";
import {VehicleImageService} from "@app/components/vehicle/services/vehicle-image.service";
import {BaseSentImage} from "@app/base/models/image/BaseSentImage";
import {VehicleSentImage} from "@app/components/vehicle/models/VehicleSentImage";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vehicle-image',
  templateUrl: './vehicle-image.component.html',
  styleUrl: './vehicle-image.component.scss'
})
export class VehicleImageComponent {

  image: VehicleSentImage = new VehicleSentImage({
    id:null,
    name:"",
    photoInBase64:"",
    vehicleId: 0
  })

  constructor(
    protected vehicleImageService: VehicleImageService,
    protected activatedRoute : ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getVehicleIdFromUrl();
  }

  getVehicleIdFromUrl(){
    this.activatedRoute.params.subscribe(params => {
      this.image.vehicleId = params['id'];
    });
  }

}
