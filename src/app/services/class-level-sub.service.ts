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

  constructor(private http: HttpClient, @Inject(RC_CLASS_LEVEL_SUB_API_URL) private classLevelSubApiUrl: string) {
  }

  getAllClassLevelSubs(): Observable<ClassLevelSub[]> {
    return this.http.get<ClassLevelSub[]>(this.classLevelSubApiUrl);
  }

  getAllClassLevelSubsByClassLevelId(classLevelId: number): Observable<ClassLevelSub[]> {
    return this.http.get<ClassLevelSub[]>(this.classLevelSubApiUrl + "/level/" + classLevelId);
  }

  updateClassLevelSub(classLevelSub: ClassLevelSub): Observable<EntityResponse> {
    return this.http.put(`${this.classLevelSubApiUrl}/${classLevelSub.id}`, classLevelSub);
  }
}
