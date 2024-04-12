import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedResponse} from "../../../interfaces/PaginatedResponse";
import {BACKEND_API} from "../../../configurations/api";
import {BaseModel} from "../models/BaseModel";
import {ID} from "../../../types/GeneralTypes";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<I extends BaseModel , K extends string> {

  abstract key: string ;
  protected constructor(
    private http: HttpClient
  ) { }

  searchItems(searchTerm: string , page: number , size: number) :Observable<PaginatedResponse<I,K>>{
    return this.http.get<PaginatedResponse<I ,K>>(`${BACKEND_API}/${this.key}/search/dynamicSearch?searchTerm=${searchTerm}&page=${page}&size=${size}`);
  }

  addItem(item: I) :Observable<I>{
    return this.http.post<I>(`${BACKEND_API}/${this.key}`, item);
  }

  updateItem(item: I) :Observable<I>{
    return this.http.put<I>(`${BACKEND_API}/${this.key}/${item.id}`, item);
  }

  getItem(id: ID) :Observable<I>{
    return this.http.get<I>(`${BACKEND_API}/${this.key}/${id}`);
  }

  deleteItem(id: ID) :Observable<void>{
    return this.http.delete<void>(`${BACKEND_API}/${this.key}/${id}`);
  }
}
