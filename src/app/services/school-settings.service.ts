import {Inject, Injectable} from '@angular/core';
import {RC_SETTINGS_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SchoolSettings} from "../models/dto/schoolsettings.model";
import {EntityResponse} from "../models/dto/entity.response";

@Injectable({
  providedIn: 'root'
})
export class SchoolSettingsService {

  constructor(@Inject(RC_SETTINGS_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  getSettings(): Observable<SchoolSettings> {
    return this.http.get<SchoolSettings>(`${this.apiUrl}`);
  }

  updateSettings(schoolSettings: SchoolSettings): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(`${this.apiUrl}`, schoolSettings);
  }
}
