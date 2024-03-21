import { Component } from '@angular/core';
import { Piece } from '../../models/Piece';
import { PieceImage } from '../../models/PieceImage';
import { PopupService } from '../../../popup/services/popup.service';
import { PieceService } from '../../services/piece.service';
import { PopupType } from '../../../popup/enums/PopupType';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-piece-add',
  templateUrl: './piece-add.component.html',
  styleUrls: ['./piece-add.component.scss']
})
export class PieceAddComponent {

  piece: Piece = {
    id: null,
    name: '',
    images: []
  };

  constructor(private pieceService: PieceService, private popupService: PopupService ,
              private router: Router) {}

  addPiece() {
    if (this.piece.images.length === 0) {
      this.popupService.show(['Please select at least one image.'], PopupType.ERROR);
      return;
    }

    this.pieceService.addItem(this.piece).subscribe(
      () => {
        this.popupService.show(['Piece Added Successfully'], PopupType.SUCCESS);
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
        photoPath: null
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

  gotoListPiece(){
    this.router.navigate(['/pieces/list']);
  }
}
