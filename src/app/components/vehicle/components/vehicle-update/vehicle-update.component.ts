import {Component} from '@angular/core';
import {Vehicle} from "../../models/Vehicle";
import {BaseUpdateComponent} from "../../../base/base-update/base-update.component";
import {VehicleService} from "../../services/vehicle.service";
import {AuthService} from "../../../../authentication/services/auth.service";
import {PopupService} from "../../../popup/services/popup.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VehicleType} from "../../enums/VehicleType";
import {EngineType} from "../../enums/EngineType";
import {VehicleImageService} from "../../../../services/vehicle-image.service";
import {VehicleImage} from "../../models/VehicleImage";
import {PopupType} from "../../../popup/enums/PopupType";
import {ImageHolder} from "../../../../interfaces/ImageHolder";
import {ImageType} from "../../../../enums/ImageType";

@Component({
  selector: 'app-vehicle-update',
  templateUrl: './vehicle-update.component.html',
  styleUrl: './vehicle-update.component.scss'
})
export class VehicleUpdateComponent extends BaseUpdateComponent<Vehicle, "vehicles", VehicleService>{

  activateSupportImage = true;

  constructor(override itemService: VehicleService,
              override popupService: PopupService,
              override activatedRoute: ActivatedRoute,
              override router: Router,
              override authService: AuthService,
              private vehicleImageService: VehicleImageService) {
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

  test(images: ImageHolder[]) {

    console.log("i am here !!");
    images.filter((image) => image.type === ImageType.LOCAL)
      .forEach(image => {

      const vehicleImage : VehicleImage = {
        id: null,
        name: image.name,
        photoInBase64Format: image.source.split(",")[1] as string,
        photoPath: null,
        vehicle: {
          id: this.item.id
        },
      };
      console.log(vehicleImage);

      this.vehicleImageService.addItem(vehicleImage).subscribe(
        () => {
        },
        (httpErrorResponse) => {
          console.error(httpErrorResponse);
          this.popupService.show(httpErrorResponse.error, PopupType.ERROR);
        }
      );
    });

  }

  testDelete(image: ImageHolder) {
    if(image.type === ImageType.LOCAL){
      return;
    }
    this.vehicleImageService.deleteItem(image.id).subscribe(
      () => {
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);
        this.popupService.show(httpErrorResponse.error, PopupType.ERROR);
      }
    );
  }

  // This is a workaround for the lack of enums in Angular templates
  protected readonly Object = Object;
  protected readonly VehicleType = VehicleType;
  protected readonly EngineType = EngineType;
}
