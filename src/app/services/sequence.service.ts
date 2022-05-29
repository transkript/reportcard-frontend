import {Inject, Injectable} from '@angular/core';
import {RC_SEQUENCE_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sequence} from "../models/dto/sequence.model";

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  constructor(@Inject(RC_SEQUENCE_API_URL) private apiUrl: string, private http: HttpClient) {
  }

  getAllSequences(): Observable<Sequence[]> {
    return this.http.get<Sequence[]>(this.apiUrl);
  }

}
