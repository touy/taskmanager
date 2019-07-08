import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './role-list.component';

import { ThemeModule } from '../../@theme/theme.module';
// import { UserAddComponent } from './user-add/user-add.component';
// import { UserEditComponent } from './user-edit/user-edit.component';


@NgModule({
  declarations: [RoleListComponent],
  imports: [
    CommonModule,
    ThemeModule
  ],
})
export class RoleListModule { }
