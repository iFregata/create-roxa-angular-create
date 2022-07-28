import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { Store } from '@ngxs/store';

import { AuthState } from './store/state';
import * as fromActions from './store/actions';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private store: Store) { }
  canActivate(): boolean {
    return this._checkAuthentication();
  }
  canActivateChild(): boolean {
    return this._checkAuthentication();
  }
  canLoad(): boolean {
    return this._checkAuthentication();
  }

  _checkAuthentication(): boolean {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (!isAuthenticated)
      this.store.dispatch(new fromActions.AuthFailure());
    return isAuthenticated;
  }
}
