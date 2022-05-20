import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RC_SUBJECT_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {Subject} from "../models/dto/subject.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient, @Inject(RC_SUBJECT_API_URL) private subjectApiUrl: string) {
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectApiUrl);
  }

  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.subjectApiUrl}/${id}`);
  }

  addSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.subjectApiUrl, subject);
  }

  updateSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(`${this.subjectApiUrl}/${subject.id}`, subject);
  }
}
