import { Component, OnInit,Input} from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import pouchdb from 'pouchdb';
import { Idocument, Odocument,  MyDataBaseNames, Opermissions, OpermissionsAssigned,Ijob,Ojob,Igijuser } from '../../../interface';
import {ModalUserDocComponent} from './modal-user-doc/modal-user-doc.component';
import {ModaljobComponent} from './modal-job/modal-job.Component';
import { Iuser } from '../../user-roles/modal-user-roles/modal-user-roles.component';
// import {ModalMComponent} from './modal-m-doc/modal-m-doc.component';
@Component({
  selector: 'ngx-docadd',
  templateUrl: './docadd.component.html',
  styleUrls: ['./docadd.component.scss']
})
export class DocaddComponent implements OnInit {
  myDate = Date.now(); //ປະກາດຟັງຊັນເອີນໃຊ້ຢູ່ insert ເວລາປະຈຸບັນ
  private db: PouchDB.Database<{}>;

  jobList: Ijob[];
  docList: Idocument[];
  remoteCouch = 'http://admin:admin@localhost:5984/job-';
  now:Date=new Date();
  doc: Idocument;
  job:Ijob;
  //usercom : UserComponent;
  @Input() _id: string;
  @Input() _rev: string;
  @Input() isdelete:boolean ;
  _selecteddoc: Idocument;
  _selectedJobs: Ijob[];
  _selectedUsers: Iuser[];
  userList: Igijuser[];
  _selectedJob: Ijob[];
  _k:Ijob[];

  constructor(/*protected ref,*/private dialogService: NbDialogService, private router: Router, public _Location: Location, private route: ActivatedRoute) {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
    this.doc=new Odocument();
    this.doc._rev = '';
    this.doc._id = '';
   
    this.db = new pouchdb(MyDataBaseNames.dbdoc);
    this.docList = new Array<Odocument>();
    this.jobList = new Array<Ojob>();
     this._selectedJob= new Array<Ijob>();
    // this._k =new Array<Ojob>();
  
 
  }

  ngOnInit() {

    this.loadjobList();
    this.loaddocList();

    if(this._id){
      this.getdoc(this._id);
    }else{
      
    }
    }

  
  updatedoc(){
    console.log(this._selecteddoc);
    

    // console.log(this._selectedJob._id);
    // console.log(this._selectedJob._rev);

    if(this._rev){
      
      if(this.isdelete){
        console.log('delete');
        this.deletedoc();
      }else{
        console.log('update');
        this.db.put(this._selecteddoc,{force:true}).then(res=>{
          console.log(res);
          
        }).catch(err=>{
          console.log((err));
          
        });
      }
      
    }else{
      try{

        this.doc._id=(Math.random() * 1000000)+'';
        console.log('add new');
        this.insertdoc();
      }
      catch(e){
      }

    }
  
    
  }


  insertdoc(){

    //this.job.createdtime=this.now+''; //ບັນທືກເວລາປະຈຸບັນເຂົ້ນເຂົ້າຖານຂໍ້ມູນ
    //  this.job.jobs=this._selectedJobs+'';
      console.log(this.doc);
      ///
    let m=new OpermissionsAssigned();
    this._selectedUsers.forEach((v,i,a)=>{
      m=new OpermissionsAssigned();
      m.admin='this user';
      m.assignedname=v.username;
      m.endtime;
      m.starttime;
      m.permissionlevel='1';
      m.title='team mate';
      this.doc.members.push(m);
    });
    //

    //
    this.db.post(this.doc,{}, (err, res) => {
      if (err) {
        console.log('err after put');
        console.log(err);
      } else {
        console.log('after put');
        console.log(res);
      }
      console.log(this.doc)
    });
  }


  deletedoc(){
    this.db.remove(this._selecteddoc).then(res=>{

    }).catch(err=>{
      
    })
  }
 

  updateManyjob(arr:[]){
    // for many at once
    this.db.bulkDocs(arr,{new_edits:true,},(err,res)=>{
      if(err){
        console.log(err);
        
      } 
      else{
        console.log(res);
        
      }
    });
  }
  getdoc(id:string) {
    this.db.get(id).then(res=>{
      console.log(res);
      this._selecteddoc=res as Odocument;
    }).catch(err=>{
      console.log('getjob error');
      //console.log('id: '+id);
      console.log(err);
      
    });
    
  }


  refresh(): void {
    this.router.navigateByUrl('/user',{skipLocationChange:true}).then(()=>{
        this.router.navigate([decodeURI(this._Location.path())]);
    });
  }




  addmember() {
    let dlg = this.dialogService.open(ModalUserDocComponent, {

    });

    dlg.onClose.subscribe(result => {

      console.log(result);
      
      if(result.command==='update'){
       this._selectedUsers = result.l;
       

     }
    });

  }


  addjobs() {
    let dlg = this.dialogService.open(ModaljobComponent, { 
      
    });

    dlg.onClose.subscribe(result => {
      console.log(result);
      if(result.command==='update'){
        this._selectedJobs = result.j;
        this._k = result.j;
       // this._addJob = result.j;
      }
     // this.ref.close({ command: 'update' , j:this._k});
   //console.log();
    });
  
  }

  goblack(){
    this.router.navigate(['/pages/doclist/'],{})
  }

  loadjobList() {
    const pageSize = 10;
    const offSet = 0;
    const parent = this;
    this.jobList.length = 0;
    this.jobList = new Array<Ijob>();
    this.db.allDocs({ limit: pageSize, skip: offSet, descending: true, include_docs: true }).then(res => {
      //console.log(res);
      for (let index = 0; index < res.rows.length; index++) {
        parent.jobList.push(<Ijob><unknown>res.rows[index].doc);
        console.log(res.rows[index].doc);

      }
    }).catch(err => {
    //  console.log(err);
    });
  }


  loaddocList() {
    const pageSize = 10;
    const offSet = 0;
    const parent = this;
    this.docList.length = 0;
    this.docList = new Array<Idocument>();
    this.db.allDocs({ limit: pageSize, skip: offSet, descending: true, include_docs: true }).then(res => {
      //console.log(res);
      for (let index = 0; index < res.rows.length; index++) {
        parent.docList.push(<Idocument><unknown>res.rows[index].doc);
        console.log(res.rows[index].doc);

      }
    }).catch(err => {
    //  console.log(err);
    });
  }

  selectJob(j:Ijob,e){
    
    //this._selectedUser=u;
    if ( e.target.checked ){
      this._selectedJob.push(j);
    }else if(e.target.checked!==undefined){
      this._selectedJob=this._selectedJob.filter(x=>{return JSON.stringify(x)!==JSON.stringify(j)})
    }

  }
}
