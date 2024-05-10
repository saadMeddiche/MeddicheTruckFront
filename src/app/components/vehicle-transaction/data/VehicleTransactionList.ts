import {Injectable} from "@angular/core";
import {Column} from "@app/base/models/Column";
import {VehicleTransaction} from "@app/components/vehicle-transaction/models/VehicleTransaction";
import {ColumnType} from "@app/base/enums/ColumnType";
import {ListConfig} from "@app/base/models/ListConfig";

@Injectable({
  providedIn: 'root'
})
export class VehicleTransactionList {

  transactionColumns : Column<VehicleTransaction>[] = [
    {
      name: 'date',
      label: 'Date' ,
      type: ColumnType.TEXT,
      value: (item: VehicleTransaction) => item.date
    },
    {
      name: 'time',
      label: 'Time',
      type: ColumnType.TEXT,
      value: (item: VehicleTransaction) => item.time
    },
    {
      name: 'description',
      label: 'Description' ,
      type: ColumnType.TEXTAREA,
      value: (item: VehicleTransaction) => item.description
    },
    {
      name: 'type',
      label: 'Type',
      type: ColumnType.TEXT,
      value: (item: VehicleTransaction) => item.type
    },
    {
      name: 'vehicleId',
      label: 'Vehicle',
      type: ColumnType.TEXT,
      value: (item: VehicleTransaction) => item.vehicleId
    },
    {
      name: 'personId',
      label: 'Person',
      type: ColumnType.TEXT,
      value: (item: VehicleTransaction) => item.personId
    },
    {
      name: 'price',
      label: 'Price',
      type: ColumnType.TEXT,
      value: (item: VehicleTransaction) => item.price
    }
  ]

  configuration : ListConfig = {
    showAddButton: false,
    showEditButton: true
  }
}
