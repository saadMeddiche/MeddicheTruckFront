import {Routes} from "@angular/router";
import {PieceComponent} from "./piece.component";
import {PieceAddComponent} from "./components/piece-add/piece-add.component";
import {PieceUpdateComponent} from "./components/piece-update/piece-update.component";
import {PieceListComponent} from "./components/piece-list/piece-list.component";
import {AuthGuard} from "../../authentication/guards/auth.guard";

export const pieceRoutes: Routes = [
  {path: 'pieces' , component: PieceComponent , canActivate: [AuthGuard]},
  {path: 'pieces/add' , component: PieceAddComponent, canActivate: [AuthGuard]},
  {path: 'pieces/edit/:id' , component: PieceUpdateComponent, canActivate: [AuthGuard]},
  {path: 'pieces/list' , component: PieceListComponent, canActivate: [AuthGuard]}
];
