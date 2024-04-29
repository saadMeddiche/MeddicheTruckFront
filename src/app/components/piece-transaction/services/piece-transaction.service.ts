import { Injectable } from '@angular/core';
import {BaseService} from "@app/base/services/base.service";
import {Vehicle} from "@app/components/vehicle/models/vehicle";
import {HttpClient} from "@angular/common/http";
import {PieceTransaction} from "@app/components/piece-transaction/models/PieceTransaction";

@Injectable({
  providedIn: 'root'
})
export class PieceTransactionService extends BaseService<PieceTransaction>{

  override key: string = 'pieceTransactions';
  constructor(override http: HttpClient) {
    super(http);
  }

}
