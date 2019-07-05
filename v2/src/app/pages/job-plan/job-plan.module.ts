import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';

import { JobPlanComponent } from './job-plan.component';


@NgModule({
  declarations: [JobPlanComponent],
  imports: [
    CommonModule,
    ThemeModule,

  ]
})
export class JobPlanModule { }
