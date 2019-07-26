import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { DocumentModule } from './document/document.module';


import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { UserModule } from './user/user.module';
import { JobofdayModule } from './jobofday/jobofday.module';
import { ManageModule } from './manage/manage.module';
import { JobPlanModule } from './job-plan/job-plan.module';
import { PlanDocumentModule } from './plan-document/plan-document.module';
import { ThemDaskbordModule } from './them-daskbord/them-daskbord.module';
import { SettingComponent } from './setting/setting.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RegularJobComponent } from './regular-job/regular-job.component';
import{RegularJobCompleComponent} from './regular-job-comple/regular-job-comple.component' 
import { ProjectJobsComponent } from './project-jobs/project-jobs.component';
import { DoclistComponent } from './doclist/doclist.component';
import { DocaddComponent } from './doclist/docadd/docadd.component';
import { IdocComponent } from './idoc/idoc.component';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
   
  
    ThemeModule,  
    MiscellaneousModule,
    DocumentModule,
    UserModule,
    JobofdayModule,
    ManageModule,
    JobPlanModule,
    PlanDocumentModule,
    ThemDaskbordModule,

  ],
  declarations: [
    ...PAGES_COMPONENTS,
    SettingComponent,
  
    
   
   
    UserRolesComponent,
    RoleListComponent,
    RegularJobComponent,
    RegularJobCompleComponent,
    ProjectJobsComponent,
    DoclistComponent,
    DocaddComponent,
    IdocComponent,

  ],
})
export class PagesModule {
}
