/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalUserRoleComponent } from './pages/user-roles/modal-user-roles/modal-user-roles.component';
import { ModalRoleListComponent } from './pages/role-list/modal-rolelist/modal-rolelist.component';
import { ModalUserComponent } from './pages/user/modal-user/modal-user.component';
import { LoginComponent } from './login/login.component';
import { SendPwComponent } from './send-pw/send-pw.component';
import{ModalJobComponent} from './pages/jobofday/modal-job/modal-job.component';
import{ModalJobPlanComponent} from './pages/job-plan/modal-jobplan/modal-jobplan.component';


@NgModule({
  declarations: [AppComponent,ModalRoleListComponent,ModalUserRoleComponent,ModalJobPlanComponent,ModalJobComponent,ModalUserComponent, LoginComponent, SendPwComponent,],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  entryComponents: [
    ModalJobComponent,
    ModalUserComponent,
    ModalJobPlanComponent,
    ModalUserRoleComponent,
    ModalRoleListComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
