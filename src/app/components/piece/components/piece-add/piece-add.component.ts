import { Component } from '@angular/core';
import { Piece } from '../../models/Piece';
import { PieceImage } from '../../models/PieceImage';
import { PopupService } from '../../../popup/services/popup.service';
import { PieceService } from '../../services/piece.service';
import { PopupType } from '../../../popup/enums/PopupType';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseAddComponent} from "../../../base/base-add/base-add.component";

@Component({
  selector: 'app-piece-add',
  templateUrl: './piece-add.component.html',
  styleUrls: ['./piece-add.component.scss']
})
export class PieceAddComponent extends BaseAddComponent<Piece, "pieces", PieceService> {

  constructor(
    override itemService: PieceService,
    override popup: PopupService,
    override router: Router
  ) {
    super(itemService, popup, router);
  }

  initializeItem(): Piece {
    return {
      id: null,
      name: '',
      images: []
    };
  }

}
