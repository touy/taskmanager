import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import {Ijob,Ojob, MyDataBaseNames} from '../../interface';
import{ModalRegularJobComponent} from'./modal-regularjob/modal-regularjob.component';
import pouchdb from 'pouchdb';
@Component({
  selector: 'ngx-regular-job',
  templateUrl: './regular-job.component.html',
  styleUrls: ['./regular-job.component.scss']
})
export class RegularJobComponent implements OnInit {
  
  jobList: Ijob[];
  selectedJob: Ijob;
  private dbjob: PouchDB.Database<{}>; // job db
  private dbdoc: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/job-';
  constructor(private dialogService: NbDialogService, private router: Router) {
    
    this.jobList = new Array<Ojob>();
    this.selectedJob= new Ojob();
    // dbfullname=prefixname+dbname+prefix
    let dbfullname=''+MyDataBaseNames.dbdoc+'';
    this.dbdoc= new pouchdb(dbfullname);
    dbfullname=''+MyDataBaseNames.dbjob+'';
    this.dbjob = new pouchdb(dbfullname);//dbname-prefix
    this.sync();

   }

   ngOnInit() {
    this.remoteCouch += MyDataBaseNames.dbjob; /// + prefix
    this.dbjob = new pouchdb(MyDataBaseNames.dbjob); // + prefix
    this.sync();
    this.loadjobList();
  }
  sync() {
    //syncDom.setAttribute('data-sync-state', 'syncing');
    let parent = this;
     // dbfullname=prefixname+dbname+prefix
     let dbfullname=''+MyDataBaseNames.dbdoc+'';
     // urlname = serverurl+
     let urlname=this.remoteCouch+dbfullname;
    this.dbdoc.sync(urlname, {
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
    // dbfullname=prefixname+dbname+prefix
    dbfullname=''+MyDataBaseNames.dbjob+'';
    // urlname = serverurl+
    urlname=this.remoteCouch+dbfullname;
    this.dbjob.sync(urlname, {
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
    this.dbjob.allDocs({ limit: pageSize, skip: offSet, descending: true, include_docs: true }).then(res => {
      //console.log(res);
      for (let index = 0; index < res.rows.length; index++) {
        parent.jobList.push(<Ijob><unknown>res.rows[index].doc);
        console.log(res.rows[index].doc);
        
      }
    }).catch(err => {
      console.log(err);
    });
  }

  job_add() {
    let dlg = this.dialogService.open(ModalRegularJobComponent, {
      context: {
        _id: '',
        _rev: ''
        //close:parent.modelClose
      }
    });

    dlg.onClose.subscribe(result => {
      this.loadjobList();
    });
  }



  job_edit(id: string, rev: string,isdelete:boolean=false) {
    let parent = this;

    let dlg=this.dialogService.open(ModalRegularJobComponent, {
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
    let dlg=this.dialogService.open(ModalRegularJobComponent, {
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
  endJob(j:Ijob){   //ສ້າງຟັງຊັນໃຫ້ກັບແຊກບອກໃນ(HTML)
    j.endtime?j.endtime='':j.endtime=new Date().toISOString(); 
    this.updatejob(j);
    //  ຖ້າວ່າ ?j.endtime   ໃຫ້ເທົ່າກັບເປົ່ບເປົ່າວ່າງ ບໍ່ມີຄ່າແມ່ນແຊັກບອກບໍ່ເຮັດວຽກ  
    //ຫຼືວ່າ :j.endtime=new Date().toISOString();ເປົ່າວ່າງແລວແອດເວລາປະຈຸບັນໃສ
  }
  updatejob(j:Ijob){ //ບັນທືກແຊັກບອກລົງຖານຂໍ້ມູນ
    this.dbjob.put(j,{force:true}).then(res=>{
      console.log(res);
      
    }).catch(err=>{
      console.log((err));
    });
  }

}
