import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND_API} from "../../../configurations/api";
import {Observable, of} from "rxjs";
import {Piece} from "../models/Piece";
import {PopupService} from "../../popup/services/popup.service";
import {PaginatedResponse} from "../../../interfaces/PaginatedResponse";

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  constructor(
    private http: HttpClient,
    private popup: PopupService
  ) { }

  searchPieces(searchTerm: string , page: number , size: number) :Observable<PaginatedResponse<Piece>>{
    return this.http.get<PaginatedResponse<Piece>>(`${BACKEND_API}/pieces/search/dynamicSearch?searchTerm=${searchTerm}&page=${page}&size=${size}`);
  }

  addPiece(piece: Piece) :Observable<Piece>{
    return this.http.post<Piece>(`${BACKEND_API}/pieces`, piece);
  }

  updatePiece(piece: Piece) :Observable<Piece>{
    return this.http.put<Piece>(`${BACKEND_API}/pieces/${piece.id}`, piece);
  }

  getPiece(id: number) :Observable<Piece>{
    return this.http.get<Piece>(`${BACKEND_API}/pieces/${id}`);
  }
}
