import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import {DoclistComponent} from './doclist.component';
@NgModule({
  declarations: [ DoclistComponent  ],
  imports: [
    CommonModule,
    ThemeModule,
  ]
})
export class DoclistModule { }
