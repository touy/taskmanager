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
<<<<<<< HEAD
import { RegularJobComponent } from './regular-job/regular-job.component';
=======
import { ProjectJobsComponent } from './project-jobs/project-jobs.component';

>>>>>>> b4b3bc6fdfd115ee50f380f1bde6f08f12750508






const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
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
<<<<<<< HEAD
    RegularJobComponent,
    
   
   
=======
    ProjectJobsComponent,
>>>>>>> b4b3bc6fdfd115ee50f380f1bde6f08f12750508

  ],
})
export class PagesModule {
}
