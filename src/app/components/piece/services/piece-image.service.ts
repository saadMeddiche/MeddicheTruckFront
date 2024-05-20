import { Injectable } from '@angular/core';
import {BaseImageService} from "@app/base/services/base-image.service";
import {HttpClient} from "@angular/common/http";
import {PieceReceivedImage} from "@app/components/piece/models/PieceReceivedImage";
import {PieceSentImage} from "@app/components/piece/models/PieceSentImage";

@Injectable({
  providedIn: 'root'
})
export class PieceImageService extends BaseImageService<PieceReceivedImage , PieceSentImage> {

  override key: string = 'pieceImages';
  constructor(
    override http: HttpClient
  ) {
    super(http);
  }
}
