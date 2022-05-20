import {Inject, Injectable} from '@angular/core';
import {School} from "../models/dto/school.model";
import {HttpClient} from "@angular/common/http";
import {RC_SCHOOL_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {EntityResponse} from "../models/dto/entity.response";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient, @Inject(RC_SCHOOL_API_URL) private schoolApiUrl: string) {}

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.schoolApiUrl)
  }

  getSchoolById(id: number): Observable<School> {
    return this.http.get<School>(`${this.schoolApiUrl}/${id}`)
  }

  addSchool(school: School): Observable<EntityResponse> {
    return this.http.post<School>(this.schoolApiUrl, school)
  }

  updateSchool(school: School): Observable<EntityResponse> {
    return this.http.put<School>(`${this.schoolApiUrl}/${school.id}`, school)
  }

  deleteSchool(id: number): Observable<EntityResponse> {
    return this.http.delete<School>(`${this.schoolApiUrl}/${id}`)
  }
}
