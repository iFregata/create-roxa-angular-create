import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemListTableComponent } from './item-list/item-list-table.component';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { IconsProviderModule } from '@app/icons-provider.module';
import { NgxsModule } from '@ngxs/store';
import { ItemState } from './store/state';
import { ItemDescComponent } from './item-desc/item-desc.component';
import { ItemDescFieldsComponent } from './item-desc/item-desc-fields.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemCreateFormComponent } from './item-create/item-create-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemEditFormComponent } from './item-edit/item-edit-form.component';
import { ItemDupComponent } from './item-dup/item-dup.component';
import { ItemDupFormComponent } from './item-dup/item-dup-form.component';


@NgModule({
  declarations: [
    ItemListComponent,
    ItemListTableComponent,
    ItemDescComponent,
    ItemDescFieldsComponent,
    ItemCreateComponent,
    ItemCreateFormComponent,
    ItemEditComponent,
    ItemEditFormComponent,
    ItemDupComponent,
    ItemDupFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    NzTableModule,
    NzDividerModule,
    NzBreadCrumbModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzToolTipModule,
    NzSelectModule,
    NzModalModule,
    NzPopconfirmModule,
    NgxsModule.forFeature([ItemState]),
    ItemRoutingModule,
  ]
})
export class ItemModule { }
