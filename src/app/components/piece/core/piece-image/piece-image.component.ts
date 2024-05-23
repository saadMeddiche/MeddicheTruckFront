import { Component } from '@angular/core';
import {VehicleSentImage} from "@app/components/vehicle/models/VehicleSentImage";
import {VehicleImageService} from "@app/components/vehicle/services/vehicle-image.service";
import {ActivatedRoute} from "@angular/router";
import {PieceSentImage} from "@app/components/piece/models/PieceSentImage";
import {PieceImageService} from "@app/components/piece/services/piece-image.service";

@Component({
  selector: 'app-piece-image',
  templateUrl: './piece-image.component.html',
  styleUrl: './piece-image.component.scss'
})
export class PieceImageComponent {

  itemName: string = "pieceId";

  itemId: number = 0;

  constructor(
    protected pieceImageService: PieceImageService,
    protected activatedRoute : ActivatedRoute
  ) {
    this.getPieceIdFromUrl();
  }

  getPieceIdFromUrl(){
    this.activatedRoute.params.subscribe(params => {
      this.itemId = params['id'];
    });
  }
}
