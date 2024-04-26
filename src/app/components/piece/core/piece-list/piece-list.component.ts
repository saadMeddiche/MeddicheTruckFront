import {Component, ViewChild} from '@angular/core';
import {BaseAddComponent} from "@app/base/core/base-add/base-add.component";
import {Vehicle} from "@app/components/vehicle/models/vehicle";
import {VehicleService} from "@app/components/vehicle/services/vehicle.service";
import {BaseUpdateComponent} from "@app/base/core/base-update/base-update.component";
import {BaseDeleteComponent} from "@app/base/core/base-delete/base-delete.component";
import {BaseListComponent} from "@app/base/core/base-list/base-list.component";
import {Piece} from "@app/components/piece/models/piece";
import {PieceService} from "@app/components/piece/services/piece.service";
import {Router} from "@angular/router";
import {ValidationService} from "@app/base/services/validation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ColumnType} from "@app/base/enums/ColumnType";
import {Column} from "@app/base/models/Column";
import {MyInput} from "@app/base/models/MyInput";
import {InputType} from "@app/base/enums/InputType";
import {noSpaceValidator} from "@app/base/validation/costum-validators/costum.validators";
import {ID} from "@app/types/GeneralTypes";

@Component({
  selector: 'app-piece-list',
  templateUrl: './piece-list.component.html',
  styleUrl: './piece-list.component.scss'
})
export class PieceListComponent  extends ValidationService {

  @ViewChild(BaseAddComponent)
  baseAddComponent!: BaseAddComponent<Piece, PieceService>;

  @ViewChild(BaseUpdateComponent)
  baseUpdateComponent!: BaseUpdateComponent<Vehicle, VehicleService>;

  @ViewChild(BaseDeleteComponent)
  baseDeleteComponent!: BaseDeleteComponent<Vehicle, VehicleService>;

  @ViewChild(BaseListComponent)
  baseListComponent!: BaseListComponent<Vehicle, VehicleService>;

  constructor(
    protected pieceService: PieceService,
    override router: Router,
  ) {
    super(router);
  }

  columns : Column<Piece>[] = [
    {
      name: 'name',
      label: 'Name' ,
      type: ColumnType.TEXT,
      value: (item: Piece) => item.name
    },
    {
      name:'image',
      label: 'Images',
      type: ColumnType.IMAGE,
      value: (_item: Piece) => "images",
      function: (item: Piece) => this.navigateToPieceImages(item.id)
    }
  ]

  inputs: MyInput<Piece>[] = [
    {
      name: 'name',
      label: 'Name',
      type: InputType.TEXT,
      validationMessage: () => this.getErrorName('name')
    }
  ]

  override buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [
        Validators.required,
        noSpaceValidator()
      ])
    });
  }

  addPiece(){
    this.baseAddComponent.toggleModal();
  }

  editPiece(vehicleId :ID){
    console.log(vehicleId);
    this.baseUpdateComponent.startUpdateProcess(vehicleId);
  }

  deletePiece(vehicleId :ID){
    this.baseDeleteComponent.startDeleteProcess(vehicleId);
  }

  refreshList(){
    this.baseListComponent.searchItems();
  }
}
