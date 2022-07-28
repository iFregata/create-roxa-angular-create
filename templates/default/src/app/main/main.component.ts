import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import * as fromActions from '../auth/store/actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isCollapsed = false;
  @Select((state: any) => state.auth.userToken?.email)
  username$!: Observable<string>
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  signOut() {
    this.store.dispatch(new fromActions.SignOut());
  }

}
