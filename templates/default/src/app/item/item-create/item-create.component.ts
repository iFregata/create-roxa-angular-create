import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import * as fromActions from '../store/actions';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCreateComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  create(value: { formContent: any }) {
    this.store.dispatch(new fromActions.CreateOne(value.formContent));
  }

}
