import {Injectable} from "@angular/core";
import {NavigationService} from "@app/base/services/navigation.service";
import {Column} from "@app/base/models/Column";
import {Piece} from "@app/components/piece/models/piece";
import {ColumnType} from "@app/base/enums/ColumnType";
import {RowButton} from "@app/base/models/RowButton";
import {Vehicle} from "@app/components/vehicle/models/vehicle";

@Injectable({
  providedIn: 'root'
})
export class VehicleList extends NavigationService {

public readonly columns :Column<Vehicle>[] = [
    {
      name: 'plate',
      label: 'Plate' ,
      type: ColumnType.TEXT,
      value: (item: Vehicle) => item.plate
    },
    {
      name: 'model',
      label: 'Model',
      type: ColumnType.TEXT,
      value: (item: Vehicle) => item.model
    },
    {
      name: 'type',
      label: 'Type' ,
      type: ColumnType.TEXT,
      value: (item: Vehicle) => item.type
    },
    {
      name: 'engineType',
      label: 'Engine Type',
      type: ColumnType.TEXT,
      value: (item: Vehicle) => item.engineType
    },
    {
      name: 'inStock',
      label: 'In Stock',
      type: ColumnType.BOOLEAN,
      value: (item: Vehicle) => item.inStock
    },
    {
      name:'image',
      label: 'Images',
      type: ColumnType.IMAGE,
      value: (_item: Vehicle) => "images",
      function: (item: Vehicle) => this.navigateToVehicleImages(item.id)
    }
  ]

public readonly extraRowButtons :RowButton<Vehicle>[] = [
    {
      id: VehicleExtraRowButton.VEHICLE_ADD_TRANSACTION,
      type: 'button',
      name: 'Transaction',
      class: 'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-900',
    },
    // {
    //   id: VehicleExtraRowButton.VEHICLE_TRANSACTIONS,
    //   type: 'button',
    //   name: 'Transactions',
    //   class: 'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-600 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-900',
    // }
  ]
}

export enum VehicleExtraRowButton {
  VEHICLE_ADD_TRANSACTION = 'vehicleAddTransaction',
  VEHICLE_TRANSACTIONS = 'vehicleTransactions'
}
