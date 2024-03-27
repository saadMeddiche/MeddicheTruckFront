import {Component} from '@angular/core';
import {Piece} from "../../models/Piece";
import {PieceService} from "../../services/piece.service";
import {PopupService} from "../../../popup/services/popup.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PopupType} from "../../../popup/enums/PopupType";
import {ImageHolder} from "../../../../interfaces/ImageHolder";
import {ImageType} from "../../../../enums/ImageType";
import {PieceImage} from "../../models/PieceImage";
import {BACKEND} from "../../../../configurations/api";
import {AuthService} from "../../../../authentication/services/auth.service";
import {BaseUpdateComponent} from "../../../base/base-update/base-update.component";

@Component({
  selector: 'app-piece-update',
  templateUrl: './piece-update.component.html',
  styleUrl: './piece-update.component.scss'
})
export class PieceUpdateComponent extends BaseUpdateComponent<Piece, "pieces", PieceService>{

  constructor(override itemService: PieceService,
              override popupService: PopupService,
              override activatedRoute: ActivatedRoute,
              override router: Router,
              override authService: AuthService) {
    super(itemService, popupService, activatedRoute, router, authService);
  }

  initializeItem(): Piece {
    return {
      id: null,
      name: '',
      images: []
    };
  }
}


