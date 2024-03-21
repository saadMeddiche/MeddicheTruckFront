import { Component } from '@angular/core';
import {Piece} from "../../models/Piece";
import {PieceService} from "../../services/piece.service";
import {PopupService} from "../../../popup/services/popup.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PopupType} from "../../../popup/enums/PopupType";
import {PieceImage} from "../../models/PieceImage";

@Component({
  selector: 'app-piece-update',
  templateUrl: './piece-update.component.html',
  styleUrl: './piece-update.component.scss'
})
export class PieceUpdateComponent {

  host :string = "http://localhost:8080";
  piece: Piece = {
    id: null,
    name: '',
    images: []
  };

  constructor(private pieceService: PieceService,
              private popupService: PopupService,
              private activatedRoute: ActivatedRoute,
              private router :Router) {}

  ngOnInit() {
    this.getPiece();
  }

  updatePiece() {
    if (this.piece.images.length === 0) {
      this.popupService.show(['Please select at least one image.'], PopupType.ERROR);
      return;
    }

    this.pieceService.updateItem(this.piece).subscribe(
      () => {
        this.popupService.show(['Piece Updated Successfully'], PopupType.SUCCESS);
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);
        this.popupService.show(httpErrorResponse.error, PopupType.ERROR);
      }
    );
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      for (let i = 0; i < inputElement.files.length; i++) {
        const file = inputElement.files[i];
        this.readFile(file);
      }
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const pieceImage: PieceImage = {
        id: null,
        name: file.name.split('.')[0],
        photoInBase64Format: (reader.result as string).split(',')[1],
        photoPath: reader.result as string
      };

      this.piece.images.push(pieceImage);
    };
  }

  removeImage(image: PieceImage) {
    const index = this.piece.images.indexOf(image);
    if (index !== -1) {
      this.piece.images.splice(index, 1);
    }
  }

  private getPiece() {
    this.pieceService.getItem(this.activatedRoute.snapshot.params['id']).subscribe(
      (piece) => {

        console.log("Piece!!: "+piece.id)
        this.piece = piece;
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);
        this.popupService.show(httpErrorResponse.error, PopupType.ERROR);
      }
    );
  }

  gotoListPiece(){
    this.router.navigate(['/pieces/list']);
  }

}
