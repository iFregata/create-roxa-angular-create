import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ResponseBody } from '../models/common';

export abstract class BaseService {
  constructor(private http: HttpClient) {}

  abstract get apiBaseUrl(): string;

  protected request(
    method: string,
    uri: string,
    body?: any
  ): Observable<ResponseBody> {
    const url = `${this.apiBaseUrl}${uri}`;
    return this.http.request<ResponseBody>(method, url, { body }).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  protected handleRespBody<T>(respBody: ResponseBody, failback?: T) {
    if ('SUCCESS' === respBody.code) {
      if (respBody.payload) {
        return of(respBody.payload as T);
      }
      return of({} as T);
    } else {
      console.error(respBody.messages);
      if (failback) {
        return of(failback);
      }
      return throwError(() => {
        return new Error(
          respBody.messages.summary
            ? respBody.messages.summary
            : 'Unkown error!'
        );
      });
    }
  }
}
