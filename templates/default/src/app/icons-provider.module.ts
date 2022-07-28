import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  PrinterOutline,
  DeleteRowOutline,
  EyeOutline,
  UserOutline,
  LockOutline,
  AppstoreOutline,
  MenuOutline,
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  PrinterOutline,
  DeleteRowOutline,
  EyeOutline,
  UserOutline,
  LockOutline,
  AppstoreOutline,
  MenuOutline,
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {
}
