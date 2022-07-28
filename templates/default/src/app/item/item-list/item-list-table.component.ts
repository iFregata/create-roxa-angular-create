import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { Item } from '@app/models/item';

@Component({
  selector: 'app-item-list-table',
  templateUrl: './item-list-table.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListTableComponent implements OnInit {
  @Input() items!: Item[];
  @Output() actionEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  remove(item:Item){
    this.actionEvent.emit(item);
  }
}
