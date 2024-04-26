import { Injectable } from '@angular/core';
import {BaseService} from "@app/base/services/base.service";
import {Person} from "@app/components/person/models/person";
import {HttpClient} from "@angular/common/http";
import {Transaction} from "@app/components/transaction/models/transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService<Transaction> {

  override  key: string = 'transactions';
  constructor(override http :HttpClient) {
    super(http);
  }
}
