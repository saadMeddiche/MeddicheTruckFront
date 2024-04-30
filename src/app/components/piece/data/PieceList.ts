import {NavigationService} from "@app/base/services/navigation.service";
import {Column} from "@app/base/models/Column";
import {Piece} from "@app/components/piece/models/piece";
import {ColumnType} from "@app/base/enums/ColumnType";
import {RowButton} from "@app/base/models/RowButton";

export class PieceList extends NavigationService {

  public readonly columns :Column<Piece>[] = [
    {
      name: 'name',
      label: 'Name' ,
      type: ColumnType.TEXT,
      value: (item: Piece) => item.name
    },
    {
      name: 'inStock',
      label: 'In Stock',
      type: ColumnType.BOOLEAN,
      value: (item: Piece) => item.inStock
    },
    {
      name:'image',
      label: 'Images',
      type: ColumnType.IMAGE,
      value: (_item: Piece) => "images",
      function: (item: Piece) => this.navigateToPieceImages(item.id)
    }
  ]

  public readonly extraRowButtons :RowButton<Piece>[] = [
    {
      id: PieceExtraRowButton.PIECE_TRANSACTION,
      type: 'button',
      name: 'Transaction',
      class: 'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-900',
    }
  ]
}

export enum PieceExtraRowButton {
  PIECE_TRANSACTION = 'pieceTransaction'
}
