import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AcademicYear} from "../models/dto/academicyear.model";
import {RC_ACADEMIC_YEAR_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {EntityResponse} from "../models/dto/entity.response";

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {

  constructor(@Inject(RC_ACADEMIC_YEAR_API_URL) private apiUrl: string, private http: HttpClient) {

  }

  getAllAcademicYears(): Observable<AcademicYear[]> {
    return this.http.get<AcademicYear[]>(this.apiUrl);
  }

  addAcademicYear(academicYear: AcademicYear): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(`${this.apiUrl}`, academicYear);
  }

  updateAcademicYear(academicYear: AcademicYear): Observable<EntityResponse> {
    return this.http.put<EntityResponse>(`${this.apiUrl}/${academicYear.id}`, academicYear);
  }
}
