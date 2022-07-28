import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from './store/state';


@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private store: Store) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let token = this.store.selectSnapshot(AuthState.token);
    const authReq = !!token ? req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    }) : req;
    return next.handle(authReq);
  }
}