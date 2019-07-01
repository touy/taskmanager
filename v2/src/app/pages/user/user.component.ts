import { Component, OnInit } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import pouchdb from 'pouchdb';
//import * as nodefetch from 'node-fetch';
@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private db: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/user';
  constructor(private dialogService: NbDialogService, private router: Router) {
    // var MyMemPouch = pouchdb.defaults({
    //   adapter: 'memory'
    // });
    // In-memory PouchDB
    //var myMemPouch = new MyMemPouch('dbname');
    //this.db = new MyMemPouch('user');

    // remote server
    // server address
    // user
    // password
    // dbnames
    // prefix/
    // dbname/
    // usertoken
    // cryto

    this.db = new pouchdb('user');
    this.sync();
    this.db.changes({
      since: 'now',
      live: true
    }).on('change', (res)=>{
      console.log('changed');
      console.log(res);
      
      
    });
    
  }
   sync() {
    //syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = {live: true};
    this.db.replicate.to(this.remoteCouch, opts,(err,res)=>{

    });
    this.db.replicate.from(this.remoteCouch, opts, (err,res)=>{
      if(err){
        console.log('sync err');
        console.log(err);
        
      }else{
        console.log('sync res');
        console.log(res);
        
      }
    });
  }
  ngOnInit() {
    console.log('print add');
    let id=Math.random()*1000000;
    console.log(id);
    
    this.db.put({ test: 'ok', _id: id+'' },{force:true}, (err, res) => {
      if (err) {
        console.log('err after put'
        );
        
        console.log(err);

      } else {
        console.log('after put');
        
        console.log(res);
        

        this.db.allDocs({ include_docs: true, descending: true }).then(res => {
          console.log("show all docs");
          
          console.log(res);

        }).catch(err => {
          console.log("error show all docs");
          console.log(err);

        });
      }
    });
  }
  user_add() {
    this.router.navigate(['/pages/user_add'], {})
  }

  user_edit() {
    this.router.navigate(['/pages/user_edit'], { queryParams: { id: 1, save: true } })
  }



  /*  open() {
      this.dialogService.open(ModalComponent, {
        context: {
          title: 'This is a title passed to the dialog component',
          detell: 'dasdasdasdasdsa',
        },
      });
    } */


}
