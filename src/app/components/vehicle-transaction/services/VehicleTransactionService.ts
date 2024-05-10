import { Injectable } from '@angular/core';
import {BaseService} from "@app/base/services/base.service";
import {HttpClient} from "@angular/common/http";
import {VehicleTransaction} from "@app/components/vehicle-transaction/models/VehicleTransaction";

@Injectable({
  providedIn: 'root'
})
export class VehicleTransactionService extends BaseService<VehicleTransaction>{

  override key: string = 'vehicleTransactions';
  constructor(override http: HttpClient) {
    super(http);
  }

}
