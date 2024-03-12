import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND_API} from "../../../../../configurations/api";
import {Observable, of} from "rxjs";
import {Piece} from "../models/Piece";
import {catchError, map} from "rxjs/operators";
import {PopupType} from "../../../../popup/enums/PopupType";
import {PopupService} from "../../../../popup/services/popup.service";
import {PaginatedPiecesResponse} from "../models/PaginatedPiecesResponse";

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  constructor(
    private http: HttpClient,
    private popup: PopupService
  ) { }
  fetchPieceList() : Observable<PaginatedPiecesResponse> {
    return this.http.get<PaginatedPiecesResponse>(`${BACKEND_API}/pieces`);
  }
}
