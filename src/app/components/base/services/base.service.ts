import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginatedResponse} from "../../../interfaces/PaginatedResponse";
import {BACKEND_API} from "../../../configurations/api";
import {BaseModel} from "../models/BaseModel";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<I extends BaseModel> {

  abstract url: string;

  protected constructor(
    private http: HttpClient
  ) { }

  searchItems(searchTerm: string , page: number , size: number) :Observable<PaginatedResponse<I>>{
    return this.http.get<PaginatedResponse<I>>(`${BACKEND_API}/${this.url}/search/dynamicSearch?searchTerm=${searchTerm}&page=${page}&size=${size}`);
  }

  addItem(item: I) :Observable<I>{
    return this.http.post<I>(`${BACKEND_API}/pieces`, item);
  }

  updateItem(item: I) :Observable<I>{
    return this.http.put<I>(`${BACKEND_API}/pieces/${item.id}`, item);
  }

  getItem(id: number) :Observable<I>{
    return this.http.get<I>(`${BACKEND_API}/pieces/${id}`);
  }
}
