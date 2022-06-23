import {Inject, Injectable} from '@angular/core';
import {RC_SETTINGS_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EntityResponse} from "../models/dto/entity.response";
import {SchoolSettings} from "../models/dto/school-settings.model";

@Injectable({
  providedIn: 'root'
})
export class SchoolSettingsService {

  constructor(@Inject(RC_SETTINGS_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  get(): Observable<SchoolSettings> {
    return this.http.get<SchoolSettings>(`${this.apiUrl}`);
  }

  save(schoolSettings: SchoolSettings): Observable<SchoolSettings> {
    return this.http.post<SchoolSettings>(`${this.apiUrl}`, schoolSettings);
  }

  update(schoolSettings: SchoolSettings): Observable<EntityResponse> {
    return this.http.put<EntityResponse>(`${this.apiUrl}`, schoolSettings);
  }
}
