import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import * as fromActions from './store/actions';

@Injectable({
  providedIn: 'root'
})
export class ItemResolveResolver implements Resolve<Observable<any>> {
  constructor(private store: Store) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id')!;
    return this.store.dispatch(new fromActions.LoadOne(id));
  }
}
