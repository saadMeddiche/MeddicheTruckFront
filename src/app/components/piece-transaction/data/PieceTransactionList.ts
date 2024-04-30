import {Column} from "@app/base/models/Column";
import {PieceTransaction} from "@app/components/piece-transaction/models/PieceTransaction";
import {ColumnType} from "@app/base/enums/ColumnType";
import {ListConfig} from "@app/base/models/ListConfig";

export class PieceTransactionList {

  transactionColumns : Column<PieceTransaction>[] = [
    {
      name: 'date',
      label: 'Date' ,
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.date
    },
    {
      name: 'time',
      label: 'Time',
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.time
    },
    {
      name: 'description',
      label: 'Description' ,
      type: ColumnType.TEXTAREA,
      value: (item: PieceTransaction) => item.description
    },
    {
      name: 'type',
      label: 'Type',
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.type
    },
    {
      name: 'pieceId',
      label: 'Piece' ,
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.pieceId
    },
    {
      name: 'personId',
      label: 'Person',
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.personId
    },
    {
      name: 'price',
      label: 'Price',
      type: ColumnType.TEXT,
      value: (item: PieceTransaction) => item.price
    }
  ]

  configuration : ListConfig = {
    showAddButton: false,
    showEditButton: true
  }
}
