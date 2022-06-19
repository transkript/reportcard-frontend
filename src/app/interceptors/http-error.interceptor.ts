import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, EMPTY, Observable} from 'rxjs';
import {MessageService} from "primeng/api";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private msgService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(this.errorHandler));
  }

  private errorHandler = (err: HttpErrorResponse) => {

    if(err.error instanceof Error) {
      this.msgService.add({
        severity: 'warn',
        summary: err.error.name,
        detail: err.error.message
      });
    } else if(err.status == 0) {
      this.msgService.add({
        severity: 'error',
        summary: `Server error`,
        detail: `Server is not running!`
      });
    } else if (err.error == undefined){
      this.msgService.add({
        severity: 'error',
        summary: 'Unknown error',
        detail: 'Report this to the admin or developers!'
      });
    } else {
      this.msgService.add({
        severity: 'error',
        summary: err.name,
        detail: `Backend returned code ${err.status} : ${err.error.message ? err.error.message : 'Unknown error'}`
      });
    }
    return EMPTY;
  }
}
