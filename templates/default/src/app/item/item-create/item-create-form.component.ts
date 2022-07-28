import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-item-create-form',
  templateUrl: './item-create-form.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCreateFormComponent implements OnInit {

  @Output()
  actionEvent = new EventEmitter<any>();

  itemForm = this.fb.group(
    {
      sn: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    }
  );

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.actionEvent.emit({ formContent: this.itemForm.value });
  }

}
