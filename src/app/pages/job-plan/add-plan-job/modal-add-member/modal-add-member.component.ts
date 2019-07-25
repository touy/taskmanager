import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import pouchdb from 'pouchdb';
import { Igijuser, Ogijuser, MyDataBaseNames, OmySystem } from './../../../../interface';

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal-add-member.component.html',
  styleUrls: ['./modal-add-member.component.scss']
})
export class ModalAddMemberComponent  {
  private db: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/';
  userList: Igijuser[];
  TEST: string;
  _selectedUser: Ogijuser;

  constructor(protected ref: NbDialogRef<ModalAddMemberComponent> ,public _Location:Location,public router:Router) {
    this.userList = new Array<Ogijuser>();
    this._selectedUser = new Ogijuser();
  }

  ngOnInit() {
    // let dbname ='prefixname-'+MyDataBaseNames.dbuser+'prefix';
     this.remoteCouch += MyDataBaseNames.dbuser; /// + prefix
     this.db = new pouchdb(MyDataBaseNames.dbuser); // + prefix
     this.sync();
     this.loadUserList();
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
       if (info.direction == "pull") {
         this.loadUserList();
       }
 
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
   loadUserList() {
     const pageSize = 10;
     const offSet = 0;
     const parent = this;
     this.userList.length = 0;
     this.userList = new Array<Igijuser>();
     this.db.allDocs({ limit: pageSize, skip: offSet, descending: true, include_docs: true }).then(res => {
       //console.log(res);
       for (let index = 0; index < res.rows.length; index++) {
         parent.userList.push(<Igijuser><unknown>res.rows[index].doc);
       }
     }).catch(err => {
       console.log(err);
     });
   }
   
  
}



