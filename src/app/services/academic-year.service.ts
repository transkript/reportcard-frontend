import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AcademicYear} from "../models/dto/academic-year.model";
import {RC_ACADEMIC_YEAR_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {EntityResponse} from "../models/dto/entity.response";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {

  constructor(
    @Inject(RC_ACADEMIC_YEAR_API_URL) private apiUrl: string,
    private msgService: MessageService, private http: HttpClient) {
  }

  getAll(): Observable<AcademicYear[]> {
    return this.http.get<AcademicYear[]>(this.apiUrl);
  }

  save(academicYear: AcademicYear): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(`${this.apiUrl}`, academicYear);
  }

  update(academicYear: AcademicYear): Observable<EntityResponse> {
    return this.http.put<EntityResponse>(`${this.apiUrl}/${academicYear.id}`, academicYear);
  }
}
