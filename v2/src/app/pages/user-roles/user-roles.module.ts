import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRolesComponent } from './user-roles.component';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  declarations: [UserRolesComponent],
  imports: [
    CommonModule,
    ThemeModule
  ],
})
export class UserRolesModule { }
