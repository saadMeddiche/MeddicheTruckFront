import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedResponse} from "@app/interfaces/PaginatedResponse";
import {ID} from "@app/types/GeneralTypes";
import {BACKEND_API} from "@app/configurations/api";
import {BaseReceivedImage} from "@app/base/models/image/BaseReceivedImage";
import {BaseSentImage} from "@app/base/models/image/BaseSentImage";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseImageService<IR extends BaseReceivedImage , IS extends  BaseSentImage> {

  abstract key: string ;
  protected constructor(
    protected http: HttpClient
  ) { }

  searchItems(searchTerm: string , page: number , size: number) :Observable<PaginatedResponse<IR>>{
    return this.http.get<PaginatedResponse<IR>>(this.buildSearchItemsUrl(searchTerm , page , size));
  }

  addItem(item: IS) :Observable<IR> {
    return this.http.post<IR>(this.buildSimpleUrl(), item);
  }

  updateItem(item: IS) :Observable<IR> {
    return this.http.put<IR>(this.buildSimpleUrl(), item);
  }

  getItem(id: ID) :Observable<IR> {
    return this.http.get<IR>(this.buildIdUrl(id));
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

    const queryParams :string[] = [];

    if(searchTerm) queryParams.push(`searchTerm=${searchTerm}`);

    if(page) queryParams.push(`page=${page}`);

    if(size) queryParams.push(`size=${size}`);

    const queryString = queryParams.length > 0 ?  queryParams.join('&') : '';

    if(queryString) url += `?${queryString}`;

    return url;

  }
}
