import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '@app/models/item';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import * as fromActions from '../store/actions';
import { ItemState } from '../store/state';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit {
  @Select(ItemState.items)
  items$!: Observable<Item[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new fromActions.LoadAll());
  }

  remove(item:Item){
    this.store.dispatch(new fromActions.RemoveOne(item));
  }
}
