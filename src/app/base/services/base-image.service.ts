import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedResponse} from "@app/interfaces/PaginatedResponse";
import {ID} from "@app/types/GeneralTypes";
import {BACKEND_API} from "@app/configurations/api";
import {BaseReceivedImage} from "@app/base/models/image/BaseReceivedImage";
import {BaseSentImage} from "@app/base/models/image/BaseSentImage";
import {buildSearchableUrl} from "@app/utils/url";
import {replaceUpperCaseWithSpace} from "@app/utils/text";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseImageService<IR extends BaseReceivedImage , IS extends  BaseSentImage> {

  abstract key: string ;
  protected constructor(
    protected http: HttpClient
  ) { }

  searchImages(searchTerm: string , page: number , size: number) :Observable<PaginatedResponse<IR>>{
    return this.http.get<PaginatedResponse<IR>>(this.buildSearchItemsUrl(searchTerm , page , size));
  }

  searchImagesByItemId(searchTerm: string , page: number , size: number , itemId: ID) :Observable<PaginatedResponse<IR>>{
    return this.http.get<PaginatedResponse<IR>>(this.buildSearchItemsByItemIdUrl(searchTerm , page , size , itemId));
  }

  uploadImage(item: FormData) :Observable<IR> {
    return this.http.post<IR>(this.buildSimpleUrl(), item);
  }

  deleteImage(id: ID) :Observable<void> {
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

  private buildSearchItemsByItemIdUrl(searchTerm: string , page: number , size: number ,itemId: ID ) :string {
    let url = `${BACKEND_API}/${this.key}/of/${itemId}`;
    return buildSearchableUrl(searchTerm , page , size , url);
  }

  getItemName(){
    return replaceUpperCaseWithSpace(this.key);
  }

}
