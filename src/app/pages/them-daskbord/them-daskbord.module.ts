import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemDaskbordComponent } from './them-daskbord.component';
import { ThemeModule } from '../../@theme/theme.module';
import { ChartLineComponent } from './chart-line/chart-line.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ChartModule } from 'angular2-chartjs';
import { ChartOrganizationComponent } from './chart-organization/chart-organization.component';

@NgModule({
  declarations: [ThemDaskbordComponent, ChartLineComponent, ChartOrganizationComponent],
  imports: [
    CommonModule,
    ThemeModule,
    ChartModule,
    NgxChartsModule
  ]
})
export class ThemDaskbordModule { }
