import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { PlanDocumentComponent } from './plan-document.component';
import { AddDocumetComponent } from './add-documet/add-documet.component';
import { EitDocumetComponent } from './eit-documet/eit-documet.component';

@NgModule({
  declarations: [PlanDocumentComponent, AddDocumetComponent, EitDocumetComponent],
  imports: [
    CommonModule,
    ThemeModule
  ]
})
export class PlanDocumentModule { }
