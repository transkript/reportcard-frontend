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

  getAll(): Observable<ClassLevel[]> {
    return this.http.get<ClassLevel[]>(this.classLevelApiUrl);
  }

  getBySection(sectionId: number): Observable<ClassLevel[]> {
    return this.http.get<ClassLevel[]>(`${this.classLevelApiUrl}/section`, {
      params: {
        sectionId: sectionId
      }
    });
  }

  getById(id: number): Observable<ClassLevel> {
    return this.http.get<ClassLevel>(`${this.classLevelApiUrl}/${id}`);
  }

  save(classLevel: ClassLevel): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(`${this.classLevelApiUrl}`, classLevel);
  }

  update(classLevel: ClassLevel): Observable<EntityResponse> {
    return this.http.put<EntityResponse>(`${this.classLevelApiUrl}/${classLevel.id}`, classLevel);
  }

  delete(classLevel: ClassLevel): Observable<any> {
    return this.http.delete<any>(`${this.classLevelApiUrl}/${classLevel.id}`);
  }
}
