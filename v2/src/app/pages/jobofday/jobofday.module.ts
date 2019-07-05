import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { JobofdayComponent } from './jobofday.component';
// import { JobofdayEditComponent } from './jobofday-edit/jobofday-edit.component';
// import { JobofdayAddComponent } from './jobofday-add/jobofday-add.component';


@NgModule({
  declarations: [JobofdayComponent ],
  imports: [
    CommonModule,
    ThemeModule,
  ]
})
export class JobofdayModule { }
