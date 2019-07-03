import { Component, OnInit } from '@angular/core';
import { ModalComponent, Iuser, Ouser } from './modal/modal.component';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
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
    this.jobList = new Array<Ouser>();
    this.selectedJob= new Ouser();
    
    this.db = new pouchdb('job-');//dbname-prefix
    this.sync();

   }

  ngOnInit() {
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
     // if(info.direction=="push"){
        // if (info.change.docs.length) {
        //   for (let index = 0; index < info.change.docs.length; index++) {
        //     const e = info.change.docs[index] as Ouser;
        //     //console.log(e);
  
        //     // for both direction : push or pull
        //     for (let i = 0; i < parent.userList.length; i++) {
        //       let element = parent.userList[i] as Ouser;
        //       if (element._id === e._id) {
        //         parent.userList[i] = e;
        //       }
        //     }
        //   }
        // }
     // }
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
    this.jobList.length = 0;
    this.jobList = new Array<Iuser>();
    this.db.allDocs({ limit: pageSize, skip: offSet, descending: true, include_docs: true }).then(res => {
      //console.log(res);
      for (let index = 0; index < res.rows.length; index++) {
        parent.jobList.push(<Iuser><unknown>res.rows[index].doc);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  user_add() {
   this.dialogService.open(ModalComponent, {
      context: {
        _id: '',
        _rev: ''
        //close:parent.modelClose
      }
    });
  }
  user_edit(id: string, rev: string) {
    let parent = this;
    let dlg=this.dialogService.open(ModalComponent, {
      context: {
        _id: id,
        _rev: rev,
        //close:parent.modelClose
      }
    });
    dlg.onClose.subscribe(result=>{
      this.loadUserList();
    });

  }

  user_delete(id: string, rev: string) {
    let parent = this;
    let dlg=this.dialogService.open(ModalComponent, {
      context: {
        _id: id,
        _rev: rev,
        isdelete: true
      
      }
    });
    dlg.onClose.subscribe(result=>{
      this.loadUserList();
    });




  }
  
}
interface Ijob{
    
}