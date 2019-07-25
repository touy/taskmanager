
import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import pouchdb from 'pouchdb';
import { Igijuser, Ogijuser, nano_time, MyDataBaseNames } from '../../../interface';

@Component({
  selector: 'ngx-modle-menber',
  templateUrl: './modle-menber.component.html',
  styleUrls: ['./modle-menber.component.scss']
})
export class ModleMenberComponent {
  private Usertable: PouchDB.Database<{}>;

  userList: Igijuser[];
  public selectedUserList: Igijuser[];
  selectedUserEditList: Igijuser[];
  constructor(protected ref: NbDialogRef<ModleMenberComponent>, public _Location: Location, public router: Router) {

    this.Usertable = new pouchdb(MyDataBaseNames.dbuser);
  }

  ngOnInit() {

    this.genGijUser(10);
    //this.loadUserList();
  }
  genGijUser(n:number){
    this.userList=new Array<Igijuser>();
    this.selectedUserList=new Array<Igijuser>();
    this.selectedUserEditList=new Array<Igijuser>();
    for (let index = 0; index < n; index++) {
      let g= new Ogijuser();
      g._id='_' + Math.random().toString(36).substr(2, 9);
      g._rev =g._id;
      g.username=index+'';
      this.userList.push(g);
    }
  }
  loadUserList() {
    const pageSize = 10;
    const offSet = 0;
    const parent = this;
    this.userList.length = 0;
    this.userList = new Array<Igijuser>();
    this.selectedUserList = new Array<Igijuser>();
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
    this.ref.close({ ref: 'OK' });
    //this.usercom.loadUserList();


  }
  getSeleteObj(u: Igijuser) {

  }

 

  seleteObj(u: Igijuser) {
    let now =window.performance.now()*Math.pow(10,1);
    let l = this.selectedUserList.length;
    for (let index = 0; index < this.selectedUserList.length; index++) {
      const element = this.selectedUserList[index];
      if (element._id === u._id) {
        this.selectedUserList.splice(index, 1);
      }
    }
    if (this.selectedUserList.length === l) {
      this.selectedUserList.push(u);
    }

    console.log(' for');
  for (let index = 0; index < this.selectedUserList.length; index++){
    console.log('row'+this.selectedUserList[index]._id);
  }
    console.log((window.performance.now()*Math.pow(10,1))-now);


    // --------------------------------------
  //   now =window.performance.now()*Math.pow(10,1);
  //   if (this.selectedUserList.filter(x => { return x._id === u._id }).length) {
  //     this.selectedUserList = this.selectedUserList.filter(x => { return x._id !== u._id });
  //   } else {
  //     this.selectedUserList.push(u);
  //   }
  //   console.log(' filter');
  //  console.log((window.performance.now()*Math.pow(10,1))-now);
    
    
    // ////// OR
    
    // now =window.performance.now()*Math.pow(10,1);
    // this.selectedUserList.filter(x => { return x._id === u._id }).length > 0 ? this.selectedUserList = this.selectedUserList.filter(x => { return x._id !== u._id }) : this.selectedUserList.push(u);

    // console.log(' filter short');
    
    // console.log((window.performance.now()*Math.pow(10,1))-now);

   console.log(('selected '+this.selectedUserList.length));
   
  }

  getEditObj(u: Igijuser) {

  }

  seleteEditObj(u: Igijuser) {
    //let now =window.performance.now()*Math.pow(10,1);
    let l = this.selectedUserEditList.length;
    for (let index = 0; index < this.selectedUserEditList.length; index++) {
      const element = this.selectedUserEditList[index];
      if (element._id === u._id) {
        this.selectedUserEditList.splice(index, 1);
      }
    }
    if (this.selectedUserEditList.length === l) {
      this.selectedUserEditList.push(u);
    }

    console.log(' for');
    for (let index = 0; index < this.selectedUserEditList.length; index++){
      console.log('row'+this.selectedUserEditList[index]._id);
    }
      
  

  }

}
