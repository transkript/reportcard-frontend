import {Inject, Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {AcademicYear} from "../models/dto/academicyear.model";
import {RC_ACADEMIC_YEAR_API_URL} from "../app.constants";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {EntityResponse} from "../models/dto/entity.response";
import {MessageService} from "primeng/api";
import {addToMessageService} from "../utils/message-service.util";

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {

  constructor(
    @Inject(RC_ACADEMIC_YEAR_API_URL) private apiUrl: string,
    private msgService: MessageService,
    private http: HttpClient) {

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

  onError(err: HttpErrorResponse) : void {
    this.msgService.add({
      severity: 'error',
      summary: err.message,
      detail: err.error
    })
  }

}

export module AcademicYearServiceHelper {
  export const loadAcademicYears = (yearService: AcademicYearService, onLoad: (years: AcademicYear[]) => void) => {
    yearService.getAllAcademicYears().subscribe({
      next: (years) => {

        onLoad(years);
      }
    });
  }
}
