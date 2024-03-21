import { Component } from '@angular/core';
import {BaseListComponent} from "../../../base/base-list/base-list.component";
import {Piece} from "../../models/Piece";
import {PieceService} from "../../services/piece.service";
import {PopupService} from "../../../popup/services/popup.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-piece-list',
  templateUrl: './piece-list.component.html',
  styleUrl: './piece-list.component.scss'
})
export class PieceListComponent extends BaseListComponent<Piece , "pieces" , PieceService>{
   constructor(override itemService: PieceService ,
               override popup: PopupService,
               override router: Router,
              ) {
    super(itemService ,popup , router);
  }
}
