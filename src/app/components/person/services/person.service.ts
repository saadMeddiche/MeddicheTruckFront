import { Injectable } from '@angular/core';
import {Person} from "@app/components/person/models/person";
import {BaseService} from "@app/base/services/base.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonService extends BaseService<Person> {

  override  key: string = 'persons';
  constructor(override http :HttpClient) {
    super(http);
  }
}
