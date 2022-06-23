import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RC_SUBJECT_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {Subject} from "../models/dto/subject.model";
import {EntityResponse} from "../models/dto/entity.response";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient, @Inject(RC_SUBJECT_API_URL) private subjectApiUrl: string) {
  }

  getAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectApiUrl);
  }

  getById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.subjectApiUrl}/${id}`);
  }

  save(subject: Subject): Observable<EntityResponse> {
    return this.http.post<Subject>(this.subjectApiUrl, subject);
  }

  update(subject: Subject): Observable<EntityResponse> {
    return this.http.put<Subject>(`${this.subjectApiUrl}/${subject.id}`, subject);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.subjectApiUrl}/${id}`);
  }
}
