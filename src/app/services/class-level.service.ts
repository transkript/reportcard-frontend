import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RC_CLASS_LEVEL_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {ClassLevel} from "../models/dto/class-level.model";
import {EntityResponse} from "../models/dto/entity.response";

@Injectable({
  providedIn: 'root'
})
export class ClassLevelService {

  constructor(private http: HttpClient, @Inject(RC_CLASS_LEVEL_API_URL) private classLevelApiUrl: string) {
  }

  getClassLevels(): Observable<ClassLevel[]> {
    return this.http.get<ClassLevel[]>(this.classLevelApiUrl);
  }

  getClassLevelsBySectionId(sectionId: number): Observable<ClassLevel[]> {
    return this.http.get<ClassLevel[]>(`${this.classLevelApiUrl}/section`, {
      params: {
        sectionId: sectionId
      }
    });
  }

  getClassLevelById(id: number): Observable<ClassLevel> {
    return this.http.get<ClassLevel>(`${this.classLevelApiUrl}/${id}`);
  }

  addClassLevel(classLevel: ClassLevel): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(`${this.classLevelApiUrl}`, classLevel);
  }

  updateClassLevel(classLevel: ClassLevel): Observable<EntityResponse> {
    return this.http.put<EntityResponse>(`${this.classLevelApiUrl}/${classLevel.id}`, classLevel);
  }

  deleteClassLevelById(classLevel: ClassLevel): Observable<any> {
    return this.http.delete<any>(`${this.classLevelApiUrl}/${classLevel.id}`);
  }
}
