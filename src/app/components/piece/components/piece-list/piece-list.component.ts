import { Component } from '@angular/core';
import {Piece} from "../../models/Piece";
import {PieceService} from "../../services/piece.service";
import {PopupService} from "../../../popup/services/popup.service";
import {PopupType} from "../../../popup/enums/PopupType";
import {of} from "rxjs";

import {Router} from "@angular/router";
import {PaginatedResponse} from "../../../../interfaces/PaginatedResponse";

@Component({
  selector: 'app-piece-list',
  templateUrl: './piece-list.component.html',
  styleUrl: './piece-list.component.scss'
})
export class PieceListComponent {

  host :string = "http://localhost:8080";

  pieces : Piece[] = [];

  page: number = 0;

  size: number = 5;

  totalPages: number = 0;

  searchTerm: string = "";

  constructor(
    private pieceService: PieceService,
    private popup: PopupService,
    private router: Router

  ) {
  }

  ngOnInit() {
    this.searchPieces();
  }

  ngAfterViewInit() {
    this.searchPieces();
  }

  onSearch() {
    this.searchPieces();
  }

  onPageChange(n: number) {
    this.page += n;
    this.searchPieces();
  }

  searchPieces() {
    this.pieceService.searchPieces(this.searchTerm , this.page , this.size).subscribe(
      (response: PaginatedResponse<Piece>) => {
        this.pieces = response._embedded.pieces;
        this.totalPages = response.page.totalPages;
        return response;
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);
        this.popup.show(httpErrorResponse.error, PopupType.ERROR);
        return of(null);
      }
    );
  }

  gotAddPage(){
    this.router.navigate(['/pieces/add']);
  }

  editPiece(pieceId: number){
    this.router.navigate([`/pieces/edit/${pieceId}`]);
  }

}
