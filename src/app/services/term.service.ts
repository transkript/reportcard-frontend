import {Inject, Injectable} from '@angular/core';
import {RC_TERM_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Term} from "../models/dto/term.model";
import {EntityResponse} from "../models/dto/entity.response";

@Injectable({
  providedIn: 'root'
})
export class TermService {

  constructor(@Inject(RC_TERM_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  getAll(): Observable<Term[]> {
    return this.http.get<Term[]>(`${this.apiUrl}`);
  }

  save(term: Term): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(`${this.apiUrl}`, term);
  }

  update(term: Term): Observable<EntityResponse> {
    return this.http.put<EntityResponse>(`${this.apiUrl}/${term.id}`, term);
  }
}
