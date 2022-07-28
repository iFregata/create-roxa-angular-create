import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';

const STATE_TOKEN = new StateToken<any>('error')

export class RaiseError {
  static readonly type = '[Error UX] RaiseError';
  constructor(public cause: any) { }
}

export class ClearError {
  static readonly type = '[Error UX] ClearError';
}

@State<any>(
  {
    name: STATE_TOKEN
  }
)
@Injectable()
export class ErrorState {
  @Action(RaiseError)
  raiseError(ctx: StateContext<any>, { cause }: RaiseError) {
    console.error("Error Raised: " + cause);
  }
}