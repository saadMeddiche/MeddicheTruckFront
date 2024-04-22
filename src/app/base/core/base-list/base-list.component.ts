import {Component, Inject ,Input} from '@angular/core';
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
import {getSingularName, lowerCaseFirstLetter, upperCaseFirstLetter} from "@app/utils/text";
import {ColumnType} from "@app/base/enums/ColumnType";

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrl: './base-list.component.scss'
})
export class BaseListComponent<I extends BaseModel, S extends BaseService<I>> extends NavigationService {

  items : I[] = [];

  page: number = 0;

  size: number = 5;

  totalPages: number = 0;

  searchTerm: string = "";

  unWantedItemId: ID = null;

  @Input() columns: Column<I>[] = []

  @Input() itemService: S | undefined;

  deleteConfirmationModalVisible: boolean = false;

  public constructor(
    protected toastService: ToastService,
    override router: Router
  ) {
    super(router);
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
    this.itemService!.searchItems(this.searchTerm , this.page , this.size).subscribe(
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

  deleteItem(itemID: ID){
    this.itemService!.deleteItem(itemID).subscribe(
      () => {
        this.toastService.pushToToaster(`${this.getItemName()} deleted successfully`, ToastType.SUCCESS);
        this.searchItems();
      },
      (httpErrorResponse) => {

        if(httpErrorResponse.status === 404){
          this.toastService.pushToToaster(`${this.getItemName()} not found`, ToastType.DANGER);
          return;
        }

        console.error(httpErrorResponse);
        this.toastService.pushToToaster(`${this.getItemName()} didn't deleted as expected`, ToastType.DANGER);
      }
    );
    this.hideDeleteConfirmationModal()
  }

  // Store the item id that is going to be deleted
  setUnWantedItemId(itemID: ID){
    this.unWantedItemId = itemID;
    this.displayDeleteConfirmationModal()
  }

  displayDeleteConfirmationModal(){
    this.deleteConfirmationModalVisible = true;
  }

  hideDeleteConfirmationModal(){
    this.deleteConfirmationModalVisible = false;
  }


  async navigateToAddPage(){
    await this.navigateTo(`/${this.itemService!.key}/add`)
  }

  async navigateToEditPage(itemID: ID){
    await this.navigateTo(`/${this.itemService!.key}/edit/${itemID}`)
  }

  getItemName(){
    return getSingularName(this.itemService!.key);
  }

  clearSearchTerm(){
    this.searchTerm = "";
    this.searchItems();
  }

  isPreviousDisabled(){
    return this.page === 0 || this.totalPages == 0
  }

  isNextDisabled(){
    return this.page === this.totalPages - 1 || this.totalPages == 0
  }

  currentPage(){
    return this.totalPages != 0 ? this.page + 1 : 0;
  }

  protected readonly lowerCaseFirstLetter = lowerCaseFirstLetter;
  protected readonly upperCaseFirstLetter = upperCaseFirstLetter;

  protected readonly ColumnType = ColumnType;
}
