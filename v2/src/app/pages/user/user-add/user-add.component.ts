import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import pouchdb from 'pouchdb';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  private db: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/user';

  user: Iuser;

  constructor(private router: Router) {
    this.user=new Ouser();
    this.user.firstname = '';
    this.user.lastname = '';

    this.db = new pouchdb('user');
    this.sync();
    this.db.changes({
      since: 'now',
      live: true
    }).on('change', (res) => {
      console.log('changed');
      console.log(res);


    });


  }

  sync() {
    //syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = { live: true };
    this.db.replicate.to(this.remoteCouch, opts, (err, res) => {

    });
    this.db.replicate.from(this.remoteCouch, opts, (err, res) => {
      if (err) {
        console.log('sync err');
        console.log(err);

      } else {
        console.log('sync res');
        console.log(res);

      }
    });
  }

  ngOnInit() {
  }


  updateUser(isdelete:boolean = false){
    console.log(this.user);

    if(this.user._rev){
      
      if(isdelete){
        console.log('delete');
        
      }else{
        console.log('update');
      }
      
    }else{
      this.user._id=(Math.random() * 1000000)+'';
      console.log('add new');
    }

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
      
    }).catch(err=>{
      console.log(err);
      
    });
    
  }
  getAllUsers(){
    var pageSize = 5;
    var offset = 0;
    this.db.allDocs({ include_docs: true, descending: true, limit: pageSize, skip: offset }).then(res => {
      console.log("show all docs");

      console.log(res);

    }).catch(err => {
      console.log("error show all docs");
      console.log(err);

    });

  }

  goblack() {
    this.router.navigate(['/pages/user'], {})
  }

}




export interface Iuser {
  firstname: string,
  lastname: string,
  _rev: string,
  _id: string
}
export class Ouser implements Iuser{
  firstname: string;  lastname: string;
  _rev: string;
  _id: string;
}