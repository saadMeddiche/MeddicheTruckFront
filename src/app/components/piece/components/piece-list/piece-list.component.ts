import { Component } from '@angular/core';
import {Piece} from "./models/Piece";
import {PieceService} from "./services/piece.service";
import {PopupService} from "../../../popup/services/popup.service";
import {PopupType} from "../../../popup/enums/PopupType";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import {PaginatedPiecesResponse} from "./models/PaginatedPiecesResponse";

@Component({
  selector: 'app-piece-list',
  templateUrl: './piece-list.component.html',
  styleUrl: './piece-list.component.scss'
})
export class PieceListComponent {

  host :string = "http://localhost:8080";
  pieces : Piece[] = [];

  constructor(
    private pieceService: PieceService,
    private popup: PopupService

  ) {
  }

  ngOnInit() {
    this.getPieceList();
  }

  getPieceList() {
    this.pieceService.fetchPieceList().subscribe(
      (response: PaginatedPiecesResponse) => {
        this.popup.show(['List fetched with success'], PopupType.SUCCESS);
        console.log(response);
        this.pieces = response._embedded.pieces;
        return response;
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);
        this.popup.show(httpErrorResponse.error, PopupType.ERROR);
        return of(null);
      }
    );
  }

}
