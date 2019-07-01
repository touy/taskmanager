import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';

import { ThemeModule } from '../../@theme/theme.module';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
// import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [UserComponent, UserAddComponent, UserEditComponent],
  imports: [
    CommonModule,
    ThemeModule
  ],
})
export class UserModule { }
