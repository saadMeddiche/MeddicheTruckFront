import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedResponse} from "@app/interfaces/PaginatedResponse"
import {BACKEND_API} from "@app/configurations/api";
import {BaseModel} from "@app/base/models/BaseModel";
import {ID} from "@app/types/GeneralTypes";

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

  addItem(item: I) :Observable<I>{
    return this.http.post<I>(this.buildSimpleUrl(), item);
  }

  updateItem(item: I) :Observable<I>{
    return this.http.put<I>(this.buildSimpleUrl(), item);
  }

  getItem(id: ID) :Observable<I>{
    return this.http.get<I>(this.buildIdUrl(id));
  }

  deleteItem(id: ID) :Observable<void>{
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

    const queryParams :string[] = [];

    if(searchTerm) queryParams.push(`searchTerm=${searchTerm}`);

    if(page) queryParams.push(`page=${page}`);

    if(size) queryParams.push(`size=${size}`);

    const queryString = queryParams.length > 0 ?  queryParams.join('&') : '';

    if(queryString) url += `?${queryString}`;

    return url;

  }

}
