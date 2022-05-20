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

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.sectionApiUrl);
  }

  getSectionById(id: number): Observable<Section> {
    return this.http.get<Section>(`${this.sectionApiUrl}/${id}`);
  }

  addSection(section: Section): Observable<Section> {
    return this.http.post<Section>(this.sectionApiUrl, section);
  }

  updateSection(section: Section): Observable<Section> {
    return this.http.put<Section>(`${this.sectionApiUrl}/${section.id}`, section);
  }
}
