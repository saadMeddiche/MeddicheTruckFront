import {Piece} from "./Piece";

export interface PaginatedPiecesResponse {
  _embedded :{
    pieces: Piece[];
  },
  page : {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
