import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { from } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';
import { Location } from '@angular/common';

import { NbDialogService } from '@nebular/theme';
import { Ijob, Ojob, MyDataBaseNames, Igijuser, Ogijuser, OmySystem } from '../../../interface';
import pouchdb from 'pouchdb';

import {ModalAddJobComponent} from './modal-add-job/modal-add-job.component';
import {ModalAddMemberComponent} from './modal-add-member/modal-add-member.component'

@Component({
  selector: 'ngx-add-plan-job',
  templateUrl: './add-plan-job.component.html',
  styleUrls: ['./add-plan-job.component.scss']
})
export class AddPlanJobComponent implements OnInit {
  jobList: Ijob[];
  userList: Igijuser[];
  myDate = Date.now();
  private dbjob: PouchDB.Database<{}>;
  private dbuser: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/job-';
  job: Ijob;
  //usercom : UserComponent;
  @Input() _id: string;
  @Input() _rev: string;
  @Input() isdelete: boolean;
  _selectedJob: Ijob;
  _selectedUser: Ogijuser;
  timenow: Date = new Date();
  now: string;
  constructor(private dialogService: NbDialogService,private zone:NgZone,private _Location: Location, private router: Router) {
    this.jobList = new Array<Ojob>();


    this.userList = new Array<Ogijuser>();
    this._selectedUser = new Ogijuser();
  }

  ngOnInit() {
    this.remoteCouch += MyDataBaseNames.dbjob; /// + prefix
    this.dbjob = new pouchdb(MyDataBaseNames.dbjob); // + prefix
    this.loadjobList();

    this.remoteCouch += MyDataBaseNames.dbuser; /// + prefix
    this.dbuser = new pouchdb(MyDataBaseNames.dbuser); // + prefix
    this.loadUserList();
    this._selectedJob = new Ojob();
    if (this._id) {
      this.getjob(this._id);
    } else {
    }
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
  updatejob() {
    console.log(this._selectedJob);
    //console.log(this.job);
    // console.log(this._selectedJob._id);
    //console.log(this._selectedJob._rev);
    if (this._rev) {
      if (this.isdelete) {
        console.log('delete');
        this.deletejob();
      } else {
        console.log('update');
        this.dbjob.put(this._selectedJob, { force: true }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log((err));
        });
      }
    } else {
      try {
        //this.job._id=(Math.random() * 1000000)+'';
        console.log('add new');
        this.insert();
      }
      catch (e) {
        console.log(e);

      }
    }
    this.zone.run(()=>{   //ເວລາບັນທືກແລ້ວລີແຟັດໃໝ່
      this.loadjobList();
    });
    
  }

  insert() {

    // this.job.createdtime=this.now+''; //ບັນທືກເວລາປະຈຸບັນເຂົ້ນເຂົ້າຖານຂໍ້ມູນ
    //  this.job.starttime=new Date().toISOString()+''; //ບັນທືກເວລາປະຈຸບັນເຂົ້ນເຂົ້າຖານຂໍ້ມູນ

    this.dbjob.put(this._selectedJob, { force: true }, (err, res) => {
      if (err) {
        console.log('err after put');
        console.log(err);
      } else {
        console.log('after put');
        console.log(res);
      }
    });
  }

  deletejob() {
    this.dbjob.remove(this._selectedJob).then(res => {

    }).catch(err => {

    })
  }


  getjob(id: string) {
    this.dbjob.get(id).then(res => {
      console.log(res);
      this._selectedJob = res as Ojob;
    }).catch(err => {
      console.log('getjob error');
      //console.log('id: '+id);
      console.log(err);

    });

  }

  refresh(): void {
    this.router.navigateByUrl('/user', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this._Location.path())]);
    });
  }

  loadUserList() {
    const pageSize = 10;
    const offSet = 0;
    const parent = this;
    this.userList.length = 0;
    this.userList = new Array<Igijuser>();
    this.dbuser.allDocs({ limit: pageSize, skip: offSet, descending: true, include_docs: true }).then(res => {
      //console.log(res);
      for (let index = 0; index < res.rows.length; index++) {
        parent.userList.push(<Igijuser><unknown>res.rows[index].doc);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  goblack() {
    this.router.navigate(['/pages/Plan-jobs'], {})
  }

  job_add() {
    let dlg = this.dialogService.open(ModalAddJobComponent, {
      context: {
        _id: '',
        _rev: ''
        //close:parent.modelClose
      }
    });

    dlg.onClose.subscribe(result => {
      this.loadjobList();
    });
  }

  member_add(){
    let dlg = this.dialogService.open(ModalAddMemberComponent, {
      context: {
        _id: '',
        _rev: ''
        //close:parent.modelClose
      }
    });

  }
}
