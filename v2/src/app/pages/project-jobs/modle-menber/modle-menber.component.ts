
import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import pouchdb from 'pouchdb';
import {Igijuser,Ogijuser,nano_time, MyDataBaseNames} from '../../../interface';

@Component({
  selector: 'ngx-modle-menber',
  templateUrl: './modle-menber.component.html',
  styleUrls: ['./modle-menber.component.scss']
})
export class ModleMenberComponent  {
  private Usertable: PouchDB.Database<{}>;

  userList: Igijuser[];
  constructor(protected ref: NbDialogRef<ModleMenberComponent> ,public _Location:Location,public router:Router) {

    this.Usertable = new pouchdb(MyDataBaseNames.dbuser);
   }

  ngOnInit() {
    this.loadUserList()
  }

  loadUserList() {
    const pageSize = 10;
    const offSet = 0;
    const parent = this;
    this.userList.length = 0;
    this.userList = new Array<Igijuser>();
    this.Usertable.allDocs({ limit: pageSize, skip: offSet, descending: true, include_docs: true }).then(res => {
      console.log(res);
      for (let index = 0; index < res.rows.length; index++) {
        parent.userList.push(<Igijuser><unknown>res.rows[index].doc);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  
  close() {
    this.ref.close({ref:'OK'});
    //this.usercom.loadUserList();
    

  }

}
