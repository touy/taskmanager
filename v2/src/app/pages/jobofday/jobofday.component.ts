import { Component, OnInit } from '@angular/core';
import { ModalJobComponent } from './modal-job/modal-job.component';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import {Ijob,Ojob, MyDataBaseNames} from '../../interface'
import pouchdb from 'pouchdb';
@Component({
  selector: 'ngx-jobofday',
  templateUrl: './jobofday.component.html',
  styleUrls: ['./jobofday.component.scss']
})
export class JobofdayComponent implements OnInit {
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
    this.remoteCouch += MyDataBaseNames.dbjob; /// + prefix
    this.db = new pouchdb(MyDataBaseNames.dbjob); // + prefix
    this.sync();
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
   this.dialogService.open(ModalJobComponent, {
      context: {
        _id: '',
        _rev: '',
        isdelete:false
        //close:parent.modelClose
      }
    });
  }



  job_edit(id: string, rev: string,isdelete:boolean=false) {
    let parent = this;

    let dlg=this.dialogService.open(ModalJobComponent, {
      context: {
        _id: id,
        _rev: rev,
        isdelete:isdelete
        //close:parent.modelClose
      }
    });
    dlg.onClose.subscribe(result=>{
      
      if(result.command!='cancel'){
        this.loadjobList();
      }
      
    });

  }

  job_delete(id: string, rev: string) {
    let parent = this;
    let dlg=this.dialogService.open(ModalJobComponent, {
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
  
  
}