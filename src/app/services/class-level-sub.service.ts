import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RC_CLASS_LEVEL_SUB_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {ClassLevelSub} from "../models/dto/classlevelsub.model";
import {EntityResponse} from "../models/dto/entity.response";

@Injectable({
  providedIn: 'root'
})
export class ClassLevelSubService {

  constructor(private http: HttpClient, @Inject(RC_CLASS_LEVEL_SUB_API_URL) private apiUrl: string) {
  }

  getAllClassLevelSubs(): Observable<ClassLevelSub[]> {
    return this.http.get<ClassLevelSub[]>(this.apiUrl);
  }

  getAllClassLevelSubsByClassLevelId(classLevelId: number): Observable<ClassLevelSub[]> {
    return this.http.get<ClassLevelSub[]>(this.apiUrl + "/level/" + classLevelId);
  }

  updateClassLevelSub(classLevelSub: ClassLevelSub): Observable<EntityResponse> {
    return this.http.put(`${this.apiUrl}/${classLevelSub.id}`, classLevelSub);
  }

  addClassLevelSub(classLevelSub: ClassLevelSub): Observable<EntityResponse> {
    return this.http.post(`${this.apiUrl}`, classLevelSub);
  }

  deleteClassLevelSub(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
