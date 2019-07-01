import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import pouchdb from 'pouchdb';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  private db: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/user';


  constructor(private router: Router) { 

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
  }

  adduser(){
    console.log('print add');
    let id=Math.random()*1000000;
    console.log(id);
    
    this.db.put({ test: 'Add User', _id: id+'' },{force:true}, (err, res) => {
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

  goblack(){
    this.router.navigate(['/pages/user'],{})
  }

}
