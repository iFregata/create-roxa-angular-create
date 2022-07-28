import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofActionDispatched, ofActionSuccessful } from '@ngxs/store';

import * as fromAuthActions from './auth/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles:[],
})
export class AppComponent implements OnInit {
  constructor(private actions$: Actions, private router: Router) { }
  ngOnInit(): void {
    this.actions$.pipe(ofActionSuccessful(fromAuthActions.SignIn)).subscribe(() => {
      this.router.navigate(['/main']);
    });
    this.actions$.pipe(ofActionDispatched(fromAuthActions.AuthFailure)).subscribe(() => {
      this.router.navigate(['/auth/sign-in']);
    });
    this.actions$.pipe(ofActionDispatched(fromAuthActions.SignOut)).subscribe(() => {
      this.router.navigate(['/auth/sign-in']);
    });
  }
}
