import {Inject, Injectable} from '@angular/core';
import {RC_DEFAULT_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  constructor(@Inject(RC_DEFAULT_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  create(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/create`, {})
  }
}
