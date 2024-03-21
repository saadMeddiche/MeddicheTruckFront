import { Component } from '@angular/core';
import {PopupService} from "../../popup/services/popup.service";
import {Router} from "@angular/router";
import {PaginatedResponse} from "../../../interfaces/PaginatedResponse";
import {PopupType} from "../../popup/enums/PopupType";
import {of} from "rxjs";
import {BaseModel} from "../models/BaseModel";
import {BaseService} from "../services/base.service";

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrl: './base-list.component.scss'
})
export abstract class BaseListComponent<I extends BaseModel, S extends BaseService<I>> {

  host :string = "http://localhost:8080";

  items : I[] = [];

  page: number = 0;

  size: number = 5;

  totalPages: number = 0;

  searchTerm: string = "";

  protected constructor(
    private itemService: S,
    private popup: PopupService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.searchPieces();
  }

  ngAfterViewInit() {
    this.searchPieces();
  }

  onSearch() {
    this.searchPieces();
  }

  onPageChange(n: number) {
    this.page += n;
    this.searchPieces();
  }

  searchPieces() {
    this.itemService.searchItems(this.searchTerm , this.page , this.size).subscribe(
      (response: PaginatedResponse<I>) => {
        this.items = response._embedded.items;
        this.totalPages = response.page.totalPages;
        return response;
      },
      (httpErrorResponse) => {
        console.error(httpErrorResponse);
        this.popup.show(httpErrorResponse.error, PopupType.ERROR);
        return of(null);
      }
    );
  }

  gotAddPage(){
    this.router.navigate([`/${this.itemService.url}/add`]);
  }

  editPiece(pieceId: number){
    this.router.navigate([`/${this.itemService.url}/edit/${pieceId}`]);
  }
}
