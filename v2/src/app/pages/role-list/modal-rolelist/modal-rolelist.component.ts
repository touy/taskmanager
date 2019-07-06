import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { nano_time, MyDataBaseNames, Orolelist, Irolelist } from '../../../interface';
import pouchdb from 'pouchdb';


@Component({
  selector: 'ngx-modal',
  templateUrl: './modal-rolelist.component.html',
  styleUrls: ['./modal-rolelist.component.scss'],
  
})
export class ModalRoleListComponent  implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('destroy modal role list');
    
  }

  private db: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/';

  _selectedObj: Irolelist;
  fulldbname: string;

  //usercom : UserComponent;
  @Input() _id: string;
  @Input() _rev: string;
  @Input() isdelete: boolean;
  constructor(protected ref: NbDialogRef<ModalRoleListComponent>, public _Location: Location, public router: Router) {


    this._selectedObj = new Orolelist();
    this._selectedObj._rev = '';
    this._selectedObj._id = nano_time.now();

    // prefixname+dbname+prefix;
    this.fulldbname = 'prefixname' + MyDataBaseNames.dbrolelist + 'prefix';
    console.log('dbname',this.fulldbname);
    
    this.db = new pouchdb(this.fulldbname);
  }
  ngOnInit() {
    this.get();
  }
  update(id: string = '', rev: string = '', isdelete: boolean = false) {
    // new : rev =''
    // delete : isdelete =true
    if (!isdelete) {
      if (!id && !rev ) {// add new
        this._selectedObj._id = nano_time.now();
      }
      this.db.put(this._selectedObj).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    } else {
      if (id && rev) { // delete
        this.db.remove(id, rev).then(res => {
          console.log(res);

        }).catch(err => {
          console.log(err);

        });
      }
      else {
        console.log('NOTHING');
      }
    }
    this.close();
  }
  get() {
    if (this._id) {
      this.db.get(this._id).then(res => {
        this._selectedObj = res as Irolelist;
      }).catch(err => {
        console.log(err);
      });
    } else {
      console.log('empty id');
      this._selectedObj = new Orolelist();
    }

  }
  close() {
    this.ref.close({ command: 'update' });
  }
  cancel() {
    this.ref.close({ command: 'cancel' });
  }

}

