import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '@app/models/item';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ItemState } from '../store/state';

@Component({
  selector: 'app-item-desc',
  templateUrl: './item-desc.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDescComponent implements OnInit {

  @Select(ItemState.selected)
  item$!: Observable<Item>;

  constructor() { }

  ngOnInit(): void {
  }

}
