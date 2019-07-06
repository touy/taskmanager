import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { PagesComponent } from './pages.component';


import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DocumentComponent } from './document/document.component';
import { ThemDaskbordComponent } from './them-daskbord/them-daskbord.component';

import { UserComponent } from './user/user.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { RoleListComponent } from './role-list/role-list.component';

import { JobofdayComponent } from './jobofday/jobofday.component';

import { JobPlanComponent } from './job-plan/job-plan.component';
import { AddPlanJobComponent } from './job-plan/add-plan-job/add-plan-job.component';

import { PlanDocumentComponent } from './plan-document/plan-document.component';
import { AddDocumetComponent } from './plan-document/add-documet/add-documet.component';

import { ApplyComponent } from './manage/apply/apply.component';
import { ConfirmComponent } from './manage/apply/confirm/confirm.component';

import { ScoreComponent } from './manage/score/score.component';
import { AddScoreComponent } from './manage/score/add-score/add-score.component';
import { SettingComponent } from './setting/setting.component';
import { ProjectJobsComponent } from './project-jobs/project-jobs.component';


import{RegularJobComponent} from'./regular-job/regular-job.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DocumentComponent,
<<<<<<< HEAD
  },
  {
    path: 'role-list',
    component: RoleListComponent,
  },
  {
    path: 'user-roles',
    component: UserRolesComponent,
  },
  {
=======
  }, {
    path: 'regularjob',
    component: RegularJobComponent,
},{
>>>>>>> 4de048de5b747f840fe056bfefaf62fdb9ca6235
    path: 'dashboard-them',
    component: ThemDaskbordComponent,
  }, {
    path: 'user',
    component: UserComponent,
  }, {
    path: 'jobs_of_day',
    component: JobofdayComponent,
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
<<<<<<< HEAD
    component: JobPlanComponent,
  }, {
=======
    component: ProjectJobsComponent,
  },{
>>>>>>> 4de048de5b747f840fe056bfefaf62fdb9ca6235
    path: 'Add-Plan-jobs',
    component: AddPlanJobComponent,
  },
  {
    path: 'Plan-document-my',
    component: PlanDocumentComponent,
  },{
    path: 'Plan-document-Add',
    component: AddDocumetComponent,
  },
   {
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
