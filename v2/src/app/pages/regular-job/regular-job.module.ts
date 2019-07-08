import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { RegularJobComponent } from './regular-job.component';

@NgModule({
  declarations: [ RegularJobComponent  ],
  imports: [
    CommonModule,
    ThemeModule,
  ]
})
export class RegularJobModule { }
