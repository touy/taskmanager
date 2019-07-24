import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Ijob, Ojob, MyDataBaseNames } from '../../../interface';

@Component({
  selector: 'ngx-modle-jobs',
  templateUrl: './modle-jobs.component.html',
  styleUrls: ['./modle-jobs.component.scss']
})
export class ModleJobsComponent  {

  jobsList: Ijob[];
  selectedjobsList: Ijob[];
  constructor(protected ref: NbDialogRef<ModleJobsComponent> ,public _Location:Location,public router:Router) { }

  ngOnInit() {
    this.genGijob(10);
  }

  genGijob(n:number){
    this.jobsList=new Array<Ijob>();
    this.selectedjobsList=new Array<Ijob>();
  
    for (let index = 0; index < n; index++) {
      let g= new Ojob();
      g._id='_' + Math.random().toString(36).substr(2, 9);
      g._rev = g._id;
      g.jobname=index+'';
      this.jobsList.push(g);

   
    }
  }

  getSeleteObj(u: Ijob) {

  }

  seleteObj(u: Ijob) {

    let l = this.selectedjobsList.length;
    for (let index = 0; index < this.selectedjobsList.length; index++) {
      const element = this.selectedjobsList[index];
      if (element._id === u._id) {
        this.selectedjobsList.splice(index, 1);
      }
    }
    if (this.selectedjobsList.length === l) {
      this.selectedjobsList.push(u);
    }

  // //   console.log(' for');
  // for (let index = 0; index < this.selectedjobsList.length; index++){
  //   console.log('row'+this.selectedjobsList[index]._id);
  // }
   


  

   console.log(('selected '+this.selectedjobsList.length));
   
  }


  
  close() {
    this.ref.close({ref:'OK'});
    //this.usercom.loadUserList();
    

  }

}
