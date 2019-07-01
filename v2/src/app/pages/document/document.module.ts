import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentComponent } from './document.component';


import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [DocumentComponent],
  imports: [
    CommonModule,
    ThemeModule
  ]
})
export class DocumentModule { }
