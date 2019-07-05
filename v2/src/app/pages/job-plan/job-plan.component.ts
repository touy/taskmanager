import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalJobPlanComponent } from './modal-jobplan/modal-jobplan.component';
import { NbDialogService } from '@nebular/theme';
import {Ijob,Ojob} from '../../interface'
import pouchdb from 'pouchdb';

@Component({
  selector: 'ngx-job-plan',
  templateUrl: './job-plan.component.html',
  styleUrls: ['./job-plan.component.scss']
})
export class JobPlanComponent implements OnInit {
  jobList: Ijob[];
  selectedJob: Ijob;
  private db: PouchDB.Database<{}>;
  
  remoteCouch = 'http://admin:admin@localhost:5984/job-';
  constructor(private dialogService: NbDialogService, private router: Router) {
    this.jobList = new Array<Ojob>();
    this.selectedJob= new Ojob();
    
    this.db = new pouchdb('job-');//dbname-prefix
    this.sync();

   }

  ngOnInit() {
    this.loadjobList();
  }
  sync() {
    //syncDom.setAttribute('data-sync-state', 'syncing');
    let parent = this;
    this.db.sync(this.remoteCouch, {
      live: true,
      //retry: true
    }).on('change', async (info) => {
      console.log('sync res');
      console.log(info);
    }).on('paused', function (err) {
      // replication paused (e.g. replication up to date, user went offline)
      console.log('paused');

    }).on('active', function () {
      // replicate resumed (e.g. new changes replicating, user went back online)
      console.log('active');
    }).on('denied', function (err) {
      // a document failed to replicate (e.g. due to permissions)
      console.log('denied');
    }).on('complete', function (info) {
      // handle complete
    }).on('error', function (err) {
      console.log('sync err');
      console.log(err);
    });
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
      }
    }).catch(err => {
      console.log(err);
    });
  }


  job_add() {
   this.dialogService.open(ModalJobPlanComponent, {
      context: {
        _id: '',
        _rev: '',
        isdelete:false
        //close:parent.modelClose
      }
    });
  }



  job_edit(id: string, rev: string) {
    let parent = this;
    let dlg=this.dialogService.open(ModalJobPlanComponent, {
      context: {
        _id: id,
        _rev: rev,
        //close:parent.modelClose
      }
    });
    dlg.onClose.subscribe(result=>{
      this.loadjobList();
    });

  }

  job_delete(id: string, rev: string) {
    let parent = this;
    let dlg=this.dialogService.open(ModalJobPlanComponent, {
      context: {
        _id: id,
        _rev: rev,
        isdelete: true
      
      }
    });
    dlg.onClose.subscribe(result=>{
      this.loadjobList();
    });



  }
    

  add(){
    this.router.navigate(['/pages/Add-Plan-jobs'],{})
  }

  edit(){
    this.router.navigate(['/pages/Edit-Plan-jobs'],{ queryParams: { id: 1 ,save:true} })
  }


}
