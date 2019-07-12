import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { from } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';
import {Location} from '@angular/common';
import { NbDialogService } from '@nebular/theme';
import {Ijob,Ojob, MyDataBaseNames} from '../../../interface';
import pouchdb from 'pouchdb';

@Component({
  selector: 'ngx-add-plan-job',
  templateUrl: './add-plan-job.component.html',
  styleUrls: ['./add-plan-job.component.scss']
})
export class AddPlanJobComponent implements OnInit {
  jobList: Ijob[];
  myDate = Date.now();
  private db: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/job-';
  job: Ijob;
  //usercom : UserComponent;
  @Input() _id: string;
  @Input() _rev: string;
  @Input() isdelete:boolean ;
  _selectedJob: Ijob;
  timenow:Date=new Date();
  now: string;
  constructor(private _Location:Location, private router: Router) {
     this.jobList = new Array<Ojob>();
    this.job=new Ojob();
    this.job._rev = '';
    this.job._id = '';
    this.db = new pouchdb(MyDataBaseNames.dbjob);
    

   }

   ngOnInit() {
    this.remoteCouch += MyDataBaseNames.dbjob; /// + prefix
    this.db = new pouchdb(MyDataBaseNames.dbjob); // + prefix
    this.loadjobList();
   
    if(this._id){
      this.getjob(this._id);
    }else{
      
    }
 
    }

  loadjobList() {
    const pageSize = 10;
    const offSet = 0;
    const parent = this;
    this.jobList.length = 0;
    this.jobList = new Array<Ijob>();
    this.db.allDocs({ limit: pageSize, skip: offSet, descending: true, include_docs: true }).then(res => {
      //console.log(res);
      for (let index = 0; index < res.rows.length; index++) {
        parent.jobList.push(<Ijob><unknown>res.rows[index].doc);
        console.log(res.rows[index].doc);
        
      }
    }).catch(err => {
      console.log(err);
    });
  }
  updatejob(){
     console.log(this._selectedJob);
    //console.log(this._selectedJob._id);
   // console.log(this._selectedJob._rev);
    if(this._rev){
      if(this.isdelete){
        console.log('delete');
        this.deletejob();
      }else{
        console.log('update');
        this.db.put(this._selectedJob,{force:true}).then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log((err));
        });
      }
    }else{
      try{
        this.job._id=(Math.random() * 1000000)+'';
        console.log('add new');
        this.insert(); 
      }
      catch(e){
      }
    }
  }


  insert(){

   // this.job.createdtime=this.now+''; //ບັນທືກເວລາປະຈຸບັນເຂົ້ນເຂົ້າຖານຂໍ້ມູນ
  //  this.job.starttime=new Date().toISOString()+''; //ບັນທືກເວລາປະຈຸບັນເຂົ້ນເຂົ້າຖານຂໍ້ມູນ
    this.db.put(this.job, { force: true }, (err, res) => {
      if (err) {
        console.log('err after put'
        );
        console.log(err);
      } else {
        console.log('after put');
        console.log(res);
      }
    });
  }


  deletejob(){
    this.db.remove(this._selectedJob).then(res=>{

    }).catch(err=>{
      
    })
  }
 

  updateManyjob(arr:[]){
    // for many at once
    this.db.bulkDocs(arr,{new_edits:true,},(err,res)=>{
      if(err){
        console.log(err);
        
      } 
      else{
        console.log(res);
        
      }
    });
  }

  getjob(id:string) {
    this.db.get(id).then(res=>{
      console.log(res);
      this._selectedJob=res as Ojob;
    }).catch(err=>{
      console.log('getjob error');
      //console.log('id: '+id);
      console.log(err);
      
    });
    
  }

  refresh(): void {
    this.router.navigateByUrl('/user',{skipLocationChange:true}).then(()=>{
        this.router.navigate([decodeURI(this._Location.path())]);
    });
  }

  goblack(){
    this.router.navigate(['/pages/Plan-jobs'],{})
  }

}
