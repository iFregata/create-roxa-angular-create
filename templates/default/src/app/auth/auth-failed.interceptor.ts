import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs/operators';

import * as fromActions from './store/actions';

@Injectable()
export class AuthFailedInterceptor implements HttpInterceptor {

  constructor(private store: Store) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(catchError(err => {
      if ([401, 403].includes(err.status)) {
        this.store.dispatch(new fromActions.AuthFailure())
      }
      const error = (err && err.error && err.error.message) || err.statusText;
      return throwError(error);
    }))
  }
}
