import { Component, OnInit,Input} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import pouchdb from 'pouchdb';
import { Idocument, Odocument,  MyDataBaseNames, Opermissions, OpermissionsAssigned,Ijob,Ojob } from '../../../interface';
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

  constructor(private dialogService: NbDialogService, private router: Router, public _Location: Location, private route: ActivatedRoute) {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
    this.doc=new Odocument();
    this.doc._rev = '';
    this.doc._id = '';
   
    this.db = new pouchdb(MyDataBaseNames.dbdoc);

    
  }

  ngOnInit() {
    
   
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
      //this.loadUserList();
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
      }
    });
  }

  goblack(){
    this.router.navigate(['/pages/doclist/'],{})
  }



}
