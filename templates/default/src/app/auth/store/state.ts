import * as fromActions from './actions';
import { Injectable } from '@angular/core';
import { ResetForm } from '@ngxs/form-plugin';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserToken } from '../auth-credential';

const jwts = new JwtHelperService();

const STATE_TOKEN = new StateToken<AuthStateModel>('auth');

export interface AuthStateModel {
  userToken?: UserToken;
  isAuthenticated: boolean;
  signInForm: {
    model?: {
      username: string;
      password: string;
    }
  };
}

@State({
  name: STATE_TOKEN,
  defaults: {
    userToken: undefined,
    isAuthenticated: false,
    signInForm: {
      model: undefined
    },

  }
})
@Injectable()
export class AuthState {

  constructor(private authService: AuthService) { }

  @Selector([AuthState])
  static decodedToken(state: AuthStateModel): any | undefined {
    return jwts.decodeToken(state.userToken?.token);
  }

  @Selector([AuthState])
  static token(state: AuthStateModel): UserToken | undefined {
    return state.userToken;
  }

  @Selector([AuthState])
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.userToken;
  }

  @Selector([AuthState])
  static signInForm(state: AuthStateModel): { username: string; password: string } | undefined {
    return state.signInForm.model;
  }

  @Action(fromActions.SignIn)
  signIn({ getState, setState, dispatch }: StateContext<AuthStateModel>) {
    let authCred = getState().signInForm.model!;
    return this.authService.authenticate(authCred).pipe(
      tap(rs => {
        if (rs) {
          setState(
            patch<AuthStateModel>({
              userToken: rs,
              isAuthenticated: true,
            })
          )
        }
      }),
      mergeMap(() => dispatch(new ResetForm({ path: 'auth.signInForm' })))
    )
  }

  @Action(fromActions.SignOut)
  signOut(ctx: StateContext<AuthStateModel>) {
    this.resetAuthState(ctx);
  }

  @Action(fromActions.AuthFailure)
  authFailure(ctx: StateContext<AuthStateModel>) {
    this.resetAuthState(ctx);
  }

  resetAuthState({ setState }: StateContext<AuthStateModel>) {
    setState(
      patch<AuthStateModel>({
        userToken: undefined,
        isAuthenticated: false,
      })
    );
  }
}
