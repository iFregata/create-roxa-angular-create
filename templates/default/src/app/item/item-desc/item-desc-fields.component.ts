import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Item } from '@app/models/item';

@Component({
  selector: 'app-item-desc-fields',
  templateUrl: './item-desc-fields.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDescFieldsComponent implements OnInit {

  @Input()
  item!: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
