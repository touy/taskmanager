import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';


import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DocumentComponent } from './document/document.component';
import { ThemDaskbordComponent } from './them-daskbord/them-daskbord.component';

import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

import { JobofdayComponent } from './jobofday/jobofday.component';
import { JobofdayAddComponent } from './jobofday/jobofday-add/jobofday-add.component';
import { JobofdayEditComponent } from './jobofday/jobofday-edit/jobofday-edit.component';

import { JobPlanComponent } from './job-plan/job-plan.component';
import { AddPlanJobComponent } from './job-plan/add-plan-job/add-plan-job.component';
import { EditPlanJobComponent } from './job-plan/edit-plan-job/edit-plan-job.component';

import { PlanDocumentComponent } from './plan-document/plan-document.component';
import { AddDocumetComponent } from './plan-document/add-documet/add-documet.component';
import { EitDocumetComponent } from './plan-document/eit-documet/eit-documet.component';

import { ApplyComponent } from './manage/apply/apply.component';
import { ConfirmComponent } from './manage/apply/confirm/confirm.component';

import { ScoreComponent } from './manage/score/score.component';
import { AddScoreComponent } from './manage/score/add-score/add-score.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DocumentComponent,
  }, {
    path: 'dashboard-them',
    component: ThemDaskbordComponent,
  }, {
    path: 'user',
    component: UserComponent,
  }, {
    path: 'user_add',
    component: UserAddComponent,
  }, {
    path: 'user_edit',
    component: UserEditComponent,
  }, {
    path: 'jobs_of_day',
    component: JobofdayComponent,
  }, {
    path: 'jobs_of_day_add',
    component: JobofdayAddComponent,
  }, {
    path: 'jobs_of_day_edit',
    component: JobofdayEditComponent,
  }, {
    path: 'Apply',
    component: ApplyComponent,
  }, {
    path: 'confirm',
    component: ConfirmComponent,
  }, {
    path: 'Score',
    component: ScoreComponent,
  }, {
    path: 'Score-Add',
    component: AddScoreComponent,
  }, {
    path: 'Plan-jobs',
    component: JobPlanComponent,
  },{
    path: 'Add-Plan-jobs',
    component: AddPlanJobComponent,
  },{
    path: 'Edit-Plan-jobs',
    component: EditPlanJobComponent,
  },{
    path: 'Plan-document-my',
    component: PlanDocumentComponent,
  },{
    path: 'Plan-document-Add',
    component: AddDocumetComponent,
  },{
    path: 'Plan-document-Edit',
    component: EitDocumetComponent,
  },{
    path: 'Seting',
    component: SettingComponent,
  },
   {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
