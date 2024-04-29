import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BaseModel} from "@app/base/models/BaseModel";
import {BaseService} from "@app/base/services/base.service";
import {NavigationService} from "@app/base/services/navigation.service";
import {Column} from "@app/base/models/Column";
import {ToastService} from "@app/layouts/toast/services/toast.service";
import {Router} from "@angular/router";
import {PaginatedResponse} from "@app/interfaces/PaginatedResponse";
import {ToastType} from "@app/layouts/toast/enums/ToastType";
import {of} from "rxjs";
import {ID} from "@app/types/GeneralTypes";
import {ColumnType} from "@app/base/enums/ColumnType";
import {BasePaginationComponent} from "@app/base/core/base-pagination/base-pagination.component";
import {Location} from "@angular/common";
import {ListConfig} from "@app/base/models/ListConfig";
import {RowButton} from "@app/base/models/RowButton";

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrl: './base-list.component.scss'
})
export class BaseListComponent<I extends BaseModel, S extends BaseService<I>> extends NavigationService {

  @Input() columns!: Column<I>[] ;

  @Input() itemService!: S ;

  @Input() config : ListConfig = {
    showAddButton: true,
    showEditButton: true
  };

  @Input() extraRowButtons : RowButton<I>[] = []

  items: I[] = [];

  page: number = 0;

  size: number = 5;

  totalPages: number = 0;

  searchTerm: string = "";

  @Output() addButtonIsClicked = new EventEmitter<void>();
  alertParentThatAddButtonIsClicked(){
    this.addButtonIsClicked.emit();
  }

  @Output() editButtonIsClicked = new EventEmitter<ID>();
  alertParentThatEditButtonIsClicked(itemID: ID){
    this.editButtonIsClicked.emit(itemID);
  }

  @Output() deleteButtonIsClicked = new EventEmitter<ID>();
  alertParentThatDeleteButtonIsClicked(itemID: ID){
    this.deleteButtonIsClicked.emit(itemID);
  }

  @Output() extraButtonIsClicked = new EventEmitter<RowButton<I>>();

  alertParentThatAnExtraButtonIsClicked(rowButton :RowButton<I>){
    this.extraButtonIsClicked.emit(rowButton);
  }


  @ViewChild(BasePaginationComponent)
  basePaginationComponent!: BasePaginationComponent;

  public constructor(
    protected toastService: ToastService,
    override router: Router,
    override location: Location
  ) {
    super(router, location);
  }

  ngOnInit() {
    this.searchItems();
  }

  searchItems() {
    this.itemService.searchItems(this.searchTerm , this.page , this.size).subscribe(
      (response: PaginatedResponse<I>) => {
        this.items = response.content;
        this.totalPages = response.totalPages;
        return response;
      },
      (httpErrorResponse) => {
        console.error(`\n[BaseListComponent](searchItems) httpErrorResponse: `, httpErrorResponse);

        this.toastService.pushToToaster("List didn't fetch correctly", ToastType.WARNING);

        if(httpErrorResponse.status === 401 ){
          this.toastService.pushToToaster("Error: Please reload page or re-login", ToastType.DANGER);
        }
        return of(null);
      }
    );
  }

  pageChanged(n: number) {
    this.page = n;
    this.searchItems();
  }

  clearSearchTerm(){
    this.searchTerm = "";
    this.searchItems();
  }

  clickExtraButton(button :RowButton<I> , item: I){
    button.item = item;
    if(button.onClick) button.onClick();
    this.alertParentThatAnExtraButtonIsClicked(button);
  }

  protected readonly ColumnType = ColumnType;
}
