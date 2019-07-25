import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Idocument,Odocument, MyDataBaseNames} from './../../interface';
import { NbDialogService } from '@nebular/theme';
import pouchdb from 'pouchdb';
@Component({
  selector: 'ngx-doclist',
  templateUrl: './doclist.component.html',
  styleUrls: ['./doclist.component.scss']
})
export class DoclistComponent implements OnInit {
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




  add(){
    this.router.navigate(['/pages/Dadd'],{})
  }


  


}
