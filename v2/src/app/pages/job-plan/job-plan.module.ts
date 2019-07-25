import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';

import { JobPlanComponent } from './job-plan.component';
import {AddPlanJobComponent } from './add-plan-job/add-plan-job.component';


@NgModule({
  declarations: [JobPlanComponent,AddPlanJobComponent],
  imports: [
    CommonModule,
    ThemeModule,
    
  ]
})
export class JobPlanModule { }
