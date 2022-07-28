import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import * as fromActions from '../store/actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  signIn(): void {
    this.store.dispatch(new fromActions.SignIn());
  }


}
