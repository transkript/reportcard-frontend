import {Inject, Injectable} from '@angular/core';
import {RC_GRADE_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EntityResponse} from "../models/dto/entity.response";
import {Grade} from "../models/dto/grade.model";

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(@Inject(RC_GRADE_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  save(grade: Grade): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(`${this.apiUrl}`, grade);
  }

  update(grade: Grade): Observable<EntityResponse> {
    return this.http.put<EntityResponse>(`${this.apiUrl}`, grade);
  }
}
