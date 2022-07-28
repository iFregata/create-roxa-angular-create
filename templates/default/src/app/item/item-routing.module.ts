import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemDescComponent } from './item-desc/item-desc.component';
import { ItemDupComponent } from './item-dup/item-dup.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemResolveResolver } from './item-resolve.resolver';

const routes: Routes = [
  {
    path: '',
    component: ItemListComponent
  },
  {
    path: 'create',
    component: ItemCreateComponent,
    data: {
      breadcrumb: 'New Item'
    }
  },
  {
    path: 'desc/:id',
    component: ItemDescComponent,
    resolve: {
      item: ItemResolveResolver,
    },
    data: {
      breadcrumb: 'Item Details'
    }
  },
  {
    path: 'desc/:id/edit',
    component: ItemEditComponent,
    resolve: {
      item: ItemResolveResolver
    },
    data: {
      breadcrumb: 'Item Edit'
    }
  },
  {
    path: 'desc/:id/dup',
    component: ItemDupComponent,
    resolve: {
      item: ItemResolveResolver
    },
    data: {
      breadcrumb: 'Item Duplicate'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRoutingModule {}
