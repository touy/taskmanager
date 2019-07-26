import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Idocument,Odocument, MyDataBaseNames} from './../../interface';
import { NbDialogService } from '@nebular/theme';
import pouchdb from 'pouchdb';
@Component({
  selector: 'ngx-idoc',
  templateUrl: './idoc.component.html',
  styleUrls: ['./idoc.component.scss']
})
export class IdocComponent implements OnInit {
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
  }

  ngOnInit() {
    this.remoteCouch += MyDataBaseNames.dbdoc; /// + prefix
    this.dbdoc = new pouchdb(MyDataBaseNames.dbdoc); // + prefix
  
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

  gotoDoc(){
    this.router.navigate(['/pages/doclist'],{})
  }
}
