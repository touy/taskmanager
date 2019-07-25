import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Ojob, Ijob, MyDataBaseNames } from '../../../../interface';

import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import pouchdb from 'pouchdb';
@Component({
  selector: 'ngx-modal',
  templateUrl: './modal-job.component.html',
  styleUrls: ['./modal-job.component.scss']
})
export class ModaljobComponent {
  jobList: Ijob[];
  selectedJob: Ijob;
  private dbjob: PouchDB.Database<{}>; // job db
  private dbdoc: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/job-';

  constructor(private dialogService: NbDialogService, private router: Router) {
    this.jobList = new Array<Ojob>();
    this.selectedJob = new Ojob();
    // dbfullname=prefixname+dbname+prefix
    let dbfullname = '' + MyDataBaseNames.dbdoc + '';
    this.dbdoc = new pouchdb(dbfullname);
    dbfullname = '' + MyDataBaseNames.dbjob + '';
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
    let dbfullname = '' + MyDataBaseNames.dbdoc + '';
    // urlname = serverurl+
    let urlname = this.remoteCouch + dbfullname;
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
    dbfullname = '' + MyDataBaseNames.dbjob + '';
    // urlname = serverurl+
    urlname = this.remoteCouch + dbfullname;
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
    //  console.log(err);
    });
  }






  showCompleted() {  //ຟັງຊັນເອີນສະເພາະຂໍ້ມູນທີມີ j.endtime 
    return this.jobList.filter(j => {
      return j.endtime;
    });
  }
  now: number = Date.now(); //ຟັງຊັນທົດລອງນວງເວລາ
  setNow() {
    return this.now = Date.now();
  }
  showTimeDiff() {    //ຟັງຊັນທົດລອງນວງເວລາ
    let m = Date.now();
    return (m - this.now) + '/' + m;
  }
}



