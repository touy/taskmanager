import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from './../../@theme/theme.module';
import { RegularJobCompleComponent } from './regular-job-comple.component';
@NgModule({
  declarations: [RegularJobCompleComponent],
  imports: [
    ThemeModule,
    CommonModule
  ]
})
export class RegularJobCompleModule { }
