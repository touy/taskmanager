import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import pouchdb from 'pouchdb';
import { Ojob,Ijob, MyDataBaseNames } from '../../../interface';

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal-job.component.html',
  styleUrls: ['./modal-job.component.scss']
})
export class ModalJobComponent  {
  myDate = Date.now();
  private db: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/job-';

  job: Ijob;
  //usercom : UserComponent;
  @Input() _id: string;
  @Input() _rev: string;
  @Input() isdelete:boolean ;
  _selectedJob: Ijob;
  timenow:Date=new Date();
  now: string;
  constructor(protected ref: NbDialogRef<ModalJobComponent> ,public _Location:Location,public router:Router) {

    this.job=new Ojob();
    this.job._rev = '';
    this.job._id = '';
    this.db = new pouchdb(MyDataBaseNames.dbjob);

    
  }

  ngOnInit() {

    if(this._id){
      this.getjob(this._id);
      
    }else{
      this._selectedJob=new Ojob();
    }
    }

  
  updatejob(){
    console.log(this._selectedJob);
    console.log(this._selectedJob._id);
    console.log(this._selectedJob._rev);

    if(this._rev){
      
      if(this.isdelete){
        console.log('delete');
        this.deletejob();
      }else{
        console.log('update');
        this.db.put(this._selectedJob,{force:true}).then(res=>{
          console.log(res);
          
        }).catch(err=>{
          console.log((err));
          
        });
      }
      
    }else{
      try{

        this.job._id=(Math.random() * 1000000)+'';
        console.log('add new');
        this.insert();
       
       
        
      }
      catch(e){
      }

    }
    //this.reface();
    this.ref.close({command:'update'});
    
  }


  insert(){
    this.job.createdtime=this.timenow+''; //ບັນທືກເວລາປະຈຸບັນເຂົ້ນເຂົ້າຖານຂໍ້ມູນ
    this.job.starttime=new Date().toISOString()+''; //ບັນທືກເວລາປະຈຸບັນເຂົ້ນເຂົ້າຖານຂໍ້ມູນ
    this.db.put(this.job, { force: true }, (err, res) => {
      if (err) {
        console.log('err after put'
        );
        console.log(err);
      } else {
        console.log('after put');
        console.log(res);
      }
    });
  }


  deletejob(){
    this.db.remove(this._selectedJob).then(res=>{

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
  getjob(id:string) {
    this.db.get(id).then(res=>{
      console.log(res);
      this._selectedJob=res as Ojob;
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


  close() {
    this.ref.close({command:'cancel'});
    //this.usercom.loadUserList();
  }

}


/*export interface Iuser {
  firstname: string,
  lastname: string,
  department: string,
  permission: string,
  username: string,
  password: string,
  parent: string,
  _rev: string,
  _id: string
}
export class Ouser implements Iuser{
  firstname: string;  lastname: string;  department: string; permission: string; username: string; password: string; parent: string;
  _rev: string;
  _id: string;
} 
*/

