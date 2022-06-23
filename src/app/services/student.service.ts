import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RC_STUDENT_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {Student} from "../models/dto/student.model";
import {EntityResponse} from "../models/dto/entity.response";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, @Inject(RC_STUDENT_API_URL) private studentApiUrl: string) {
  }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentApiUrl);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.studentApiUrl}/${id}`);
  }

  save(student: Student): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(this.studentApiUrl, student);
  }

  update(student: Student): Observable<EntityResponse> {
    return this.http.put<EntityResponse>(`${this.studentApiUrl}/${student.id}`, student);
  }

  delete(id: number): Observable<EntityResponse> {
    return this.http.delete<EntityResponse>(`${this.studentApiUrl}/${id}`);
  }
}
