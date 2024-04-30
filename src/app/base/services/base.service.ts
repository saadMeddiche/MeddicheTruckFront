import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedResponse} from "@app/interfaces/PaginatedResponse"
import {BACKEND_API} from "@app/configurations/api";
import {BaseModel} from "@app/base/models/BaseModel";
import {ID} from "@app/types/GeneralTypes";
import {BaseSentImage} from "@app/base/models/image/BaseSentImage";
import {buildSearchableUrl} from "@app/utils/url";
import {getSingularName, lowerCaseFirstLetter, upperCaseFirstLetter} from "@app/utils/text";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<I extends BaseModel> {

  abstract key: string ;
  protected constructor(
    protected http: HttpClient
  ) { }

  searchItems(searchTerm: string , page: number , size: number) :Observable<PaginatedResponse<I>>{
    return this.http.get<PaginatedResponse<I>>(this.buildSearchItemsUrl(searchTerm , page , size));
  }

  addItem(item: I) :Observable<I> {
    return this.http.post<I>(this.buildSimpleUrl(), item);
  }

  updateItem(item: I) :Observable<I> {
    return this.http.put<I>(this.buildSimpleUrl(), item);
  }

  getItem(id: ID) :Observable<I> {
    return this.http.get<I>(this.buildIdUrl(id));
  }

  getAllItems() :Observable<I[]> {
    return this.http.get<I[]>(this.buildSimpleUrl()+"/all");
  }

  deleteItem(id: ID) :Observable<void> {
    return this.http.delete<void>(this.buildIdUrl(id));
  }

  private buildSimpleUrl() :string {
    return `${BACKEND_API}/${this.key}`;
  }

  private buildIdUrl(id: ID) :string {
    return `${BACKEND_API}/${this.key}/${id}`;
  }

  private buildSearchItemsUrl(searchTerm: string , page: number , size: number) :string {
    let url = `${BACKEND_API}/${this.key}`;
    return buildSearchableUrl(searchTerm , page , size , url);
  }

  getItemName(){
    return getSingularName(this.key);
  }

  getItemNameUpperCase(){
    return upperCaseFirstLetter(this.getItemName())
  }

  getItemNameLowerCase(){
    return lowerCaseFirstLetter(this.getItemName());
  }

}
