import {Component, Inject} from '@angular/core';
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Router} from "@angular/router";
import {PaginatedResponse} from "@app/interfaces/PaginatedResponse";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {of} from "rxjs";
import {BaseModel} from "@app/base/models/BaseModel";
import {BaseService} from "@app/base/services/base.service";
import {ID} from "@app/types/GeneralTypes";
import {getSingularName} from "@app/utils/text";

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
    protected toastService: ToastService,
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
        this.toastService.pushToToaster(httpErrorResponse.error.message, ToastType.DANGER);
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
        this.toastService.pushToToaster(`${getSingularName(this.itemService.key)} deleted successfully`, ToastType.SUCCESS);
        this.searchItems();
      },
      (httpErrorResponse) => {

        if(httpErrorResponse.status === 404){
          this.toastService.pushToToaster(`${getSingularName(this.itemService.key)} not found`, ToastType.DANGER);
          return;
        }

        console.error(httpErrorResponse);
        this.toastService.pushToToaster(httpErrorResponse.error.message, ToastType.DANGER);
      }
    );
  }
}
