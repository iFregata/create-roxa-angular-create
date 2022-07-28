import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Item } from '@app/models/item';

@Component({
  selector: 'app-item-edit-form',
  templateUrl: './item-edit-form.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemEditFormComponent implements OnInit {

  @Input()
  itemSelected!: Item;

  @Output()
  actionEvent = new EventEmitter<any>();

  itemForm = this.fb.group({
    id: [{ value: '', disabled: true }],
    sn: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.itemForm.patchValue({
      id: this.itemSelected.id,
      sn: this.itemSelected.sn,
      name: this.itemSelected.name,
      description: this.itemSelected.description,
      price: this.itemSelected.price,
    });
  }

  onSubmit() {
    this.actionEvent.emit({ fieldsToUpdate: this.itemForm.value, selected: this.itemSelected });
  }
}
