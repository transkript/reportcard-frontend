import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, EMPTY, Observable, tap} from 'rxjs';
import {MessageService} from "primeng/api";
import {EntityResponse} from "../models/dto/entity.response";

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private msgService: MessageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const entityResponse = event.body as EntityResponse;
          if (event.status === 201) {
            this.msgService.add({severity: 'success', summary: 'Success', detail: entityResponse.message});
          }
        }
      }),
      catchError(this.errorHandler)
    );
  }

  private errorHandler = (err: HttpErrorResponse) => {

    if (err.error instanceof Error) {
      this.msgService.add({severity: 'warn', summary: err.error.name, detail: err.error.message});
    } else if (err.status == 0) {
      this.msgService.add({severity: 'error', summary: `Server error`, detail: `Server is not running!`});
    } else if (err.error == undefined) {
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
