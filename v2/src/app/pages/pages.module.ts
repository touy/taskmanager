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
import {RegularJobModule} from './regular-job/regular-job.module';



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
    RegularJobModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    SettingComponent,
  
    
   
   

  ],
})
export class PagesModule {
}
