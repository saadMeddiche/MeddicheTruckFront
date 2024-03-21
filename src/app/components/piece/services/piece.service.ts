import { Injectable } from '@angular/core';
import {Piece} from "../models/Piece";
import {BaseService} from "../../base/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class PieceService extends BaseService<Piece, "pieces">{
  override key: string = "pieces";
}
