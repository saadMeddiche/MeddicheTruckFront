import {Routes} from "@angular/router";
import {PieceComponent} from "./piece.component";
import {PieceAddComponent} from "./components/piece-add/piece-add.component";
import {PieceUpdateComponent} from "./components/piece-update/piece-update.component";
import {PieceListComponent} from "./components/piece-list/piece-list.component";

export const pieceRoutes: Routes = [
  {path: 'pieces' , component: PieceComponent},
  {path: 'pieces/add' , component: PieceAddComponent},
  {path: 'pieces/edit/:id' , component: PieceUpdateComponent},
  {path: 'pieces/list' , component: PieceListComponent}
];
