import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '@app/models/item';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ItemState } from '../store/state';
import * as fromActions from '../store/actions';

@Component({
  selector: 'app-item-dup',
  templateUrl: './item-dup.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDupComponent implements OnInit {

  @Select(ItemState.selected)
  itemSelected$!: Observable<Item>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  duplicate(value: { formContent: any }) {
    this.store.dispatch(new fromActions.DuplicateOne(value.formContent));
  }
}
