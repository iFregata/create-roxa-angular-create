import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '@app/models/item';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ItemState } from '../store/state';
import * as fromActions from '../store/actions';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemEditComponent implements OnInit {

  @Select(ItemState.selected)
  itemSelected$!: Observable<Item>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }
  update(value: { fieldsToUpdate: Partial<Item>, selected: Item }) {
    this.store.dispatch(new fromActions.UpdateOne(value.selected, value.fieldsToUpdate));
  }
}
