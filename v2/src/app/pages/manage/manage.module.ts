import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplyComponent } from './apply/apply.component';

import { ThemeModule } from '../../@theme/theme.module';
import { ConfirmComponent } from './apply/confirm/confirm.component';
import { ScoreComponent } from './score/score.component';
import { AddScoreComponent } from './score/add-score/add-score.component';

@NgModule({
  declarations: [ApplyComponent, ConfirmComponent, ScoreComponent, AddScoreComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ]
})
export class ManageModule { }
