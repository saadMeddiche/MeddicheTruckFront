import {Component, Inject} from '@angular/core';
import {PopupService} from "../../popup/services/popup.service";
import {Router} from "@angular/router";
import {PaginatedResponse} from "../../../interfaces/PaginatedResponse";
import {PopupType} from "../../popup/enums/PopupType";
import {of} from "rxjs";
import {BaseModel} from "../models/BaseModel";
import {BaseService} from "../services/base.service";
import {ID} from "../../../types/GeneralTypes";
import {getSingularName} from "../../../utils/text";

@Component({
  template: ''
})
export abstract class BaseListComponent<I extends BaseModel, K extends string, S extends BaseService<I , K>> {

  host :string = "http://localhost:8080";

  items : I[] = [];

  page: number = 0;

  size: number = 5;

  totalPages: number = 0;

  searchTerm: string = "";

  protected constructor(
    @Inject(BaseService) protected itemService: S,
    protected popup: PopupService,
    protected router: Router
  ) {
  }

  ngOnInit() {
    this.searchItems();
  }

  onSearch() {
    this.searchItems();
  }

  onPageChange(n: number) {
    this.page += n;
    this.searchItems();
  }

  searchItems() {
    this.itemService.searchItems(this.searchTerm , this.page , this.size).subscribe(
      (response: PaginatedResponse<I ,K>) => {
        for (const key in response._embedded) {
          if (Object.prototype.hasOwnProperty.call(response._embedded, key)) {
            this.items = response._embedded[key];
            break;
          }
        }
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

  gotoAddPage(){
    this.router.navigate([`/${this.itemService.key}/add`]);
  }

  editItem(itemID: ID){
    this.router.navigate([`/${this.itemService.key}/edit/${itemID}`]);
  }

  deleteItem(itemID: ID){
    alert("Are you sure you want to delete this item?");
    this.itemService.deleteItem(itemID).subscribe(
      () => {
        this.popup.show([`${getSingularName(this.itemService.key)} Deleted Successfully`], PopupType.SUCCESS);
        this.searchItems();
      },
      (httpErrorResponse) => {

        if(httpErrorResponse.status === 404){
          this.popup.show([`${getSingularName(this.itemService.key)} Not Found`], PopupType.ERROR);
          return;
        }

        console.error(httpErrorResponse);
        this.popup.show(httpErrorResponse.error, PopupType.ERROR);
      }
    );
  }
}
