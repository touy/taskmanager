import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Idocument,Odocument, MyDataBaseNames} from './../../interface';
import { NbDialogService } from '@nebular/theme';
import pouchdb from 'pouchdb';
@Component({
  selector: 'ngx-project-jobs',
  templateUrl: './project-jobs.component.html',
  styleUrls: ['./project-jobs.component.scss']
})
export class ProjectJobsComponent implements OnInit {
  docList: Idocument[];
  selecteddoc: Idocument;
  private dbjob: PouchDB.Database<{}>; // job db
  private dbdoc: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/job-';
  constructor(private dialogService: NbDialogService, private router: Router) { 
    this.docList = new Array<Odocument>();
    this.selecteddoc= new Odocument();
    // dbfullname=prefixname+dbname+prefix
    let dbfullname=''+MyDataBaseNames.dbdoc+'';
    this.dbdoc= new pouchdb(dbfullname);
    dbfullname=''+MyDataBaseNames.dbjob+'';
    this.dbdoc = new pouchdb(dbfullname);//dbname-prefix
    this.sync();

  }

  ngOnInit() {
    this.remoteCouch += MyDataBaseNames.dbdoc; /// + prefix
    this.dbdoc = new pouchdb(MyDataBaseNames.dbdoc); // + prefix
    this.sync();
    this.loaddocList();
  }

  loaddocList() {
    const pageSize = 10;
    const offSet = 0;
    const parent = this;
    this.docList.length = 0;
    this.docList = new Array<Idocument>();
    this.dbdoc.allDocs({ limit: pageSize, skip: offSet, descending: true, include_docs: true }).then(res => {
      //console.log(res);
      for (let index = 0; index < res.rows.length; index++) {
        parent.docList.push(<Idocument><unknown>res.rows[index].doc);
        console.log(res.rows[index].doc);
        
      }
    }).catch(err => {
      console.log(err);
    });
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
    dbfullname=''+MyDataBaseNames.dbdoc+'';
    // urlname = serverurl+
    urlname=this.remoteCouch+dbfullname;
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
  }

  showCompleted(){  //ຟັງຊັນເອີນສະເພາະຂໍ້ມູນທີມີ j.endtime 
    return this.docList.filter(j=>{
      return j.endtime;
    });
  }
  now:number= Date.now(); //ຟັງຊັນທົດລອງນວງເວລາ
  setNow(){
    return this.now=Date.now();
  }
  showTimeDiff(){    //ຟັງຊັນທົດລອງນວງເວລາ
    let m=Date.now();
    return (m-this.now)+'/'+m;
  }



  add(){
    this.router.navigate(['/pages/Plan-document-Add'],{})

   
  }


  Approved(d:Idocument){   
    d.status?d.status='':d.status = "ອານຸມັດ"; 
    this.updateApproved(d); 
   
  }
  updateApproved(d:Idocument){ 
    this.dbdoc.put(d,{force:true}).then(res=>{
      console.log(res);
      
    }).catch(err=>{
      console.log((err));
    });
  }


  startDoc(s:Idocument){   
    s.starttime?s.starttime='':s.starttime=new Date().toISOString(); 
    this.updatestart(s); 
   
  }

  updatestart(s:Idocument){ 
    this.dbdoc.put(s,{force:true}).then(res=>{
      console.log(res);
      
    }).catch(err=>{
      console.log((err));
    });
  }


  endDoc(e:Idocument){   
    e.endtime?e.endtime='':e.endtime=new Date().toISOString(); 
    this.updatestart(e); 
   
  }

  updateend(e:Idocument){ 
    this.dbdoc.put(e,{force:true}).then(res=>{
      console.log(res);
      
    }).catch(err=>{
      console.log((err));
    });
  }




}
