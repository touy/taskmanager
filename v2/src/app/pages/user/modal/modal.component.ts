import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import {Igijuser,Ogijuser,nano_time} from '../../../interface';
import { UserComponent } from '../user.component';
import pouchdb from 'pouchdb';

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent  {
  
  private db: PouchDB.Database<{}>;
  dbname:string;
  remoteCouch = 'http://admin:admin@localhost:5984/';

  user: Igijuser;
  //usercom : UserComponent;
  @Input() _id: string;
  @Input() _rev: string;
  @Input() isdelete:boolean ;
  _selectedUser: Igijuser;
  constructor(protected ref: NbDialogRef<ModalComponent> ,public _Location:Location,public router:Router) {

    this.user=new Ogijuser();
    this.user._rev = '';
    this.user._id = nano_time.now();

    
    
    

    
    //this.sync();
    // this.db.changes({
    //   since: 'now',
    //   live: true
    // }).on('change', (res) => {
    //   console.log('changed');
    //   console.log(res);
    // });
    // this.db.setMaxListeners(20);

    
   
     

   


  }



  // sync() {
  //   //syncDom.setAttribute('data-sync-state', 'syncing');
  //   var opts = { live: true };
  //   this.db.replicate.to(this.remoteCouch, opts, (err, res) => {

  //   });
  //   this.db.replicate.from(this.remoteCouch, opts, (err, res) => {
  //     if (err) {
  //       console.log('sync err');
  //       console.log(err);

  //     } else {
  //       console.log('sync res');
  //       console.log(res);

  //     }
  //   });
  // }

  ngOnInit() {
    this.db = new pouchdb('user');
    if(this._id){
      this.getuser(this._id);
    }else{
      this._selectedUser=new Ogijuser();
    }
    
    
    }

   
  updateUser(){
    console.log(this._selectedUser);
    console.log(this._selectedUser._id);
    console.log(this._selectedUser._rev);

    if(this._rev){
      
      if(this.isdelete){
        console.log('delete');
        this.deleteUser();
      }else{
        console.log('update');
        this.db.put(this._selectedUser,{force:true}).then(res=>{
          console.log(res);
          
        }).catch(err=>{
          console.log((err));
          
        });
      }
      
    }else{
      try{

        this.user._id=(Math.random() * 1000000)+'';
        console.log('add new');
        this.insert();
       
       
        
      }
      catch(e){
      }

    }
    //this.reface();
    this.close();
    
  }

  insert(){
    this.db.put(this.user, { force: true }, (err, res) => {
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
  deleteUser(){
    this.db.remove(this._selectedUser).then(res=>{

    }).catch(err=>{
      
    })
  }

  updateManyUsers(arr:[]){
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
  getuser(id:string) {
    this.db.get(id).then(res=>{
      console.log(res);
      this._selectedUser=res as Ogijuser;
    }).catch(err=>{
      console.log('getuser error');
      //console.log('id: '+id);
      console.log(err);
      
    });
    
  }


  refresh(): void {
    this.router.navigateByUrl('/user_',{skipLocationChange:true}).then(()=>{
        this.router.navigate([decodeURI(this._Location.path())]);
    });
  }


  close() {
    this.ref.close({ref:'OK'});
    //this.usercom.loadUserList();
    

  }

}


export interface Iuser {
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

