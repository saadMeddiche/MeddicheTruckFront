import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND_API} from "@app/configurations/api";
import {Observable} from "rxjs";
import {Profile} from "@app/components/profile/models/profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http :HttpClient) { }

  getProfileData(): Observable<Profile>{
    return this.http.get<Profile>(`${BACKEND_API}/profile`);
  }

  updateProfileData(profile: Profile){
    return this.http.put(`${BACKEND_API}/profile/update`, profile);
  }

}
