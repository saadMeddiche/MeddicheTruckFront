import { Injectable } from '@angular/core';
import {Piece} from "@app/components/piece/models/piece";
import {BaseService} from "@app/base/services/base.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PieceService extends BaseService<Piece>{

  override key: string = 'pieces';
  constructor(override http: HttpClient) {
    super(http);
  }
}
