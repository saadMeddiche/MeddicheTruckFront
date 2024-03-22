import {Component} from '@angular/core';
import {Piece} from "../../models/Piece";
import {PieceService} from "../../services/piece.service";
import {PopupService} from "../../../popup/services/popup.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PopupType} from "../../../popup/enums/PopupType";
import {Image} from "../../../../interfaces/Image";
import {ImageType} from "../../../../enums/ImageType";
import {PieceImage} from "../../models/PieceImage";
import {BACKEND} from "../../../../configurations/api";
import {AuthService} from "../../../../authentication/services/auth.service";

@Component({
  selector: 'app-piece-update',
  templateUrl: './piece-update.component.html',
  styleUrl: './piece-update.component.scss'
})
export class PieceUpdateComponent {

  piece: Piece = {
    id: null,
    name: '',
    images: []
  };

  images : Image[] = [];

  constructor(private pieceService: PieceService,
              private popupService: PopupService,
              private activatedRoute: ActivatedRoute,
              private router :Router,
              private authService : AuthService) {}

  ngOnInit() {
    this.getPiece();
  }

  updatePiece() {

    if (this.images.length === 0) {
      this.popupService.show(['Please select at least one image.'], PopupType.ERROR);
      return;
    }

    this.piece.images = this.parseImagesToPieceImages(this.images);

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

      const image: Image = {
        id: null,
        name: file.name.split('.')[0],
        type: ImageType.LOCAL,
        source: reader.result as string,
      };

      this.images.push(image);
    };
  }

  removeImage(image: Image) {
    const index = this.images.indexOf(image);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
  }

  private getPiece() {
    this.pieceService.getItem(this.activatedRoute.snapshot.params['id']).subscribe(
      (piece) => {

        this.piece.id = piece.id;
        this.piece.name = piece.name;
        this.images = this.parsePieceImagesToImages(piece.images);
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

  private parsePieceImagesToImages(pieceImages: PieceImage[]): Image[] {
    return pieceImages.map(pieceImage => {
      return {
        id: pieceImage.id,
        name: pieceImage.name,
        type: ImageType.REMOTE,
        source: pieceImage.photoPath as string
      };
    });
  }

  private parseImagesToPieceImages(images: Image[]): PieceImage[] {
    return images.map(image => {
      return {
        id: image.type === ImageType.REMOTE ? image.id : null,
        name: image.name,
        photoInBase64Format: image.type === ImageType.LOCAL ? image.source.split(",")[1] as string : null,
        photoPath: image.type === ImageType.REMOTE ? image.source as string : null
      };
    });
  }

  public displayImage(image: Image){
    return image.type == ImageType.LOCAL ? image.source : BACKEND + image.source;
  }

}
