import { Component, OnInit,Input} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import pouchdb from 'pouchdb';
import { Idocument, Odocument,Ijob,Ojob,Igijuser, Ogijuser,  MyDataBaseNames, Opermissions, OpermissionsAssigned } from '../../../interface';
import {ModalUserDocComponent} from './modal-user-doc/modal-user-doc.component';
import {ModaljobComponent} from './modal-job/modal-job.Component';
// import {ModalMComponent} from './modal-m-doc/modal-m-doc.component';
@Component({
  selector: 'ngx-docadd',
  templateUrl: './docadd.component.html',
  styleUrls: ['./docadd.component.scss']
})
export class DocaddComponent implements OnInit {
  myDate = Date.now(); //ປະກາດຟັງຊັນເອີນໃຊ້ຢູ່ insert ເວລາປະຈຸບັນ
  private db: PouchDB.Database<{}>;
  private dbjob: PouchDB.Database<{}>;
  private dbdoc: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/job-';
  now:Date=new Date();
  doc: Idocument;
  //usercom : UserComponent;
  @Input() _id: string;
  @Input() _rev: string;
  @Input() isdelete:boolean ;
  _selecteddoc: Idocument;

  jobList: Ijob[];
  selectedJob: Ijob;
  //hup kha
  _lar: Igijuser[];

  _job:Ijob[];

  constructor(private dialogService: NbDialogService, private router: Router, public _Location: Location, private route: ActivatedRoute) {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
    this.doc=new Odocument();
    this.doc._rev = '';
    this.doc._id = '';
   
    this.jobList = new Array<Ojob>();
    this.selectedJob= new Ojob();
// pa kad  bab arry
this._lar = new Array<Ogijuser>();

  this._job = new Array <Ojob>();
    // dbfullname=prefixname+dbname+prefix
    let dbfullname=''+MyDataBaseNames.dbdoc+'';
    this.dbdoc= new pouchdb(dbfullname);
    dbfullname=''+MyDataBaseNames.dbjob+'';
    this.dbjob = new pouchdb(dbfullname);//dbname-prefix
    this.sync();

  
    
  }

  ngOnInit() {
   this.loadjobList();
   
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
      console.log(this.doc);
    let m=new OpermissionsAssigned();
    
    this.doc.members.push(m);

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
        this._lar = result.l;
      
      }
      //this.loadUserList();
      let peras=new OpermissionsAssigned();
      peras;
    });
  }


  addjobs() {
    let dlg = this.dialogService.open(ModaljobComponent, {
      

    });

    dlg.onClose.subscribe(result => {
      //this.loadUserList();
     // this.ref.close({ command: 'update' ,s:this._lar});
     console.log(result);
    
     if(result.command==='update')
       this._lar = result.l;

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

  sync() {
    //syncDom.setAttribute('data-sync-state', 'syncing');
    let parent = this;
     // dbfullname=prefixname+dbname+prefix
     let dbfullname=''+MyDataBaseNames.dbdoc+'';
     // urlname = serverurl+
     let urlname=this.remoteCouch+dbfullname;
    this.dbdoc.sync(urlname, {
      live: true,
      //retry: true
    }).on('change', async (info) => {
      console.log('sync res');
      console.log(info);
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
    // dbfullname=prefixname+dbname+prefix
    dbfullname=''+MyDataBaseNames.dbjob+'';
    // urlname = serverurl+
    urlname=this.remoteCouch+dbfullname;
    this.dbjob.sync(urlname, {
      live: true,
      //retry: true
    }).on('change', async (info) => {
      console.log('sync res');
      console.log(info);
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

  selectjob(k:Ijob,e){
    
    //this._selectedUser=u;
    if ( e.target.checked ){
     
      this._job.push(k);
    }else if(e.target.checked!==undefined){
      this._job=this._job.filter(x=>{return JSON.stringify(x)!==JSON.stringify(k)})
    }

  } 

  

}
