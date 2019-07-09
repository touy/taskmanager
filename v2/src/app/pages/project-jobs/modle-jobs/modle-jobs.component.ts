import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-modle-jobs',
  templateUrl: './modle-jobs.component.html',
  styleUrls: ['./modle-jobs.component.scss']
})
export class ModleJobsComponent  {

  constructor(protected ref: NbDialogRef<ModleJobsComponent> ,public _Location:Location,public router:Router) { }

  ngOnInit() {
  }

  
  close() {
    this.ref.close({ref:'OK'});
    //this.usercom.loadUserList();
    

  }

}
