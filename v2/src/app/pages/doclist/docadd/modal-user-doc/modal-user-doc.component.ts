import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import pouchdb from 'pouchdb';
import { Igijuser, Ogijuser, nano_time, MyDataBaseNames, Idocument } from '../../../../interface';

import {ModalMComponent} from '../modal-m-doc/modal-m-doc.component';
@Component({
  selector: 'ngx-modal',
  templateUrl: './modal-user-doc.component.html',
  styleUrls: ['./modal-user-doc.component.scss']
})
export class ModalUserDocComponent  {
  
  private db: PouchDB.Database<{}>;
  dbname: string;
  remoteCouch = 'http://admin:admin@localhost:5984/';

  user: Igijuser;
  //usercom : UserComponent;
  @Input() _id: string;
  @Input() _rev: string;
  @Input() isdelete: boolean;
  _selectedUser: Igijuser;
  userList: Igijuser[];
 
 docList: Idocument[];
  
 
  constructor(protected ref: NbDialogRef<ModalUserDocComponent>,private dialogService: NbDialogService, public _Location: Location, public router: Router) {
    this.user = new Ogijuser();
    this.user._rev = '';
    this.user._id = nano_time.now();

    this.userList = new Array<Ogijuser>();
    this._selectedUser = new Ogijuser();
   
  }

  ngOnInit() {
    this.remoteCouch += MyDataBaseNames.dbuser;
    this.db = new pouchdb(MyDataBaseNames.dbuser);
    this.sync();
    this.loadUserList();
    if (this._id) {
      this.getuser(this._id);
    } else {
      this._selectedUser = new Ogijuser();
    }

    
    
  }


  updateUser() {
    console.log(this._selectedUser);
    console.log(this._selectedUser._id);
    console.log(this._selectedUser._rev);

    if (this._rev) {

      if (this.isdelete) {
        console.log('delete');
        this.deleteUser();
      } else {
        console.log('update');
        this.db.put(this._selectedUser, { force: true }).then(res => {
          console.log(res);

        }).catch(err => {
          console.log((err));

        });
      }

    } else {
      try {

        this.user._id = (Math.random() * 1000000) + '';
        console.log('add new');
        this.insert();



      }
      catch (e) {
      }

    }
    this.close();

  }

  insert() {
    this.db.put(this.user, { force: true }, (err, res) => {
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
  deleteUser() {
    this.db.remove(this._selectedUser).then(res => {

    }).catch(err => {

    })
  }

  updateManyUsers(arr: []) {
    // for many at once
    this.db.bulkDocs(arr, { new_edits: false }, (err, res) => {
      if (err) {
        console.log(err);

      }
      else {
        console.log(res);

      }
    });
  }
  getuser(id: string) {
    this.db.get(id).then(res => {
      console.log(res);
      this._selectedUser = res as Ogijuser;
    }).catch(err => {
      console.log('getuser error');
      //console.log('id: '+id);
      console.log(err);

    });

  }


  close() {
    this.ref.close({ command: 'update' });
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
  
addm(id: string, rev: string){
  let parent = this;
  let dlg = this.dialogService.open(ModalMComponent, {
    context: {
      _id: id,
      _rev: rev,
      
      
      //close:parent.modelClose
    }
  });
  console.log(this._id)
  console.log(this._rev)

  dlg.onClose.subscribe(result => {
    //this.loadUserList();
  });
}



}



