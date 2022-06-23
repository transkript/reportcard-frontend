import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RC_SECTION_API_URL} from "../app.constants";
import {Observable} from "rxjs";
import {Section} from "../models/dto/section.model";

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient, @Inject(RC_SECTION_API_URL) private sectionApiUrl: string) {
  }

  getAll(): Observable<Section[]> {
    return this.http.get<Section[]>(this.sectionApiUrl);
  }

  getById(id: number): Observable<Section> {
    return this.http.get<Section>(`${this.sectionApiUrl}/${id}`);
  }

  save(section: Section): Observable<Section> {
    return this.http.post<Section>(this.sectionApiUrl, section);
  }

  update(section: Section): Observable<Section> {
    return this.http.put<Section>(`${this.sectionApiUrl}/${section.id}`, section);
  }
}
