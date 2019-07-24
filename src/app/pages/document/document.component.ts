import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import {Ijob,Ojob, MyDataBaseNames} from '../../interface';

import pouchdb from 'pouchdb';
@Component({
  selector: 'ngx-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  jobList: Ijob[];
  selectedJob: Ijob;
  private dbjob: PouchDB.Database<{}>; // job db
  private dbdoc: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/job-';
  constructor(private dialogService: NbDialogService, private router: Router) {
    this.jobList = new Array<Ojob>();
    this.selectedJob= new Ojob();

   }

  ngOnInit() {
    this.remoteCouch += MyDataBaseNames.dbjob; /// + prefix
    this.dbjob = new pouchdb(MyDataBaseNames.dbjob); // + prefix
 
    this.loadjobList();

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

  gotoregularjob(){
    this.router.navigate(['/pages/regularjob'],{})
  }
  

}
