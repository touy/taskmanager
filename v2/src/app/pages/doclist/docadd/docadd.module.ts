import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from './../../../@theme/theme.module';
import {DocaddComponent} from './docadd.component';
@NgModule({
  declarations: [ DocaddComponent  ],
  imports: [
    CommonModule,
    ThemeModule,
  ]
})
export class DocAddModule { }
