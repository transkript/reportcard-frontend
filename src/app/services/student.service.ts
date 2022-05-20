import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RC_STUDENT_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {Student} from "../models/dto/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient, @Inject(RC_STUDENT_API_URL) private studentApiUrl: string) {
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentApiUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.studentApiUrl}/${id}`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentApiUrl, student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.studentApiUrl}/${student.id}`, student);
  }
}
