import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthCredential, UserToken } from '../auth/auth-credential';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private _apiBaseUrl: string = '/authz/v1';

  constructor(http: HttpClient) {
    super(http);
  }

  get apiBaseUrl() {
    return this._apiBaseUrl;
  }

  authenticate({ username, password }: AuthCredential): Observable<UserToken> {
    return this.request('POST', '/sign-in', {
      username: username,
      password: password,
    }).pipe(switchMap((resp) => this.handleRespBody<UserToken>(resp)));
  }
}
