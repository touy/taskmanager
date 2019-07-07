import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import pouchdb, { emit } from 'pouchdb';
import socketpouch from 'socket-pouch/client';
import pouchdbwebsql from 'pouchdb-adapter-websql';
import PouchAuth from 'pouchdb-authentication';
import pouchSecurity from 'pouchdb-security-helper';
import { MyDataBaseNames } from '../interface';
import Auth from 'pouchdb-auth';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  db: PouchDB.Database<any>;
  remoteCouch = MyDataBaseNames.remoteCouch;
  fulldbname: string;


  constructor(private router: Router) {
    pouchdb.plugin(Auth);
    pouchdb.plugin(pouchdbwebsql);
    pouchdb.plugin(PouchAuth);
    pouchdb.plugin(pouchSecurity);
    let url = this.remoteCouch + MyDataBaseNames.dbsystemuser;
    this.db = new pouchdb(url, { skip_setup: false });
    // prefixname+dbname+prefix;
    this.fulldbname = 'prefixname' + MyDataBaseNames.dbrolelist + 'prefix';
    let urlrolelist = this.remoteCouch + this.fulldbname;
    this.db.logIn('admin', 'admin', function (err, response) {
      console.log(err);
      console.log(response);
      // cosmic rays, a meteor, etc.
      
      let dbassign = new pouchdb(urlrolelist, { skip_setup: false });

      let security = dbassign.security();
      security.fetch().then(() => {
        // add superadmin as role to members and admins
        security.members.roles.add("user");
        security.admins.roles.add("admin");
        console.log('saving ...... security');

        return security.save();
      }).catch(e => {
        console.error(e);
      });
    });

    // this.db.signUp('sky','sky',{roles:['user']}).then(res=>{

    // });


  }

  ngOnInit() {
  }

  login() {
    let dbclient = new pouchdb(MyDataBaseNames.dbclient, { adapter: 'websql' });
    let url = this.remoteCouch + MyDataBaseNames.dbclient;
    this.sync(dbclient, url, (this.changehandler));

    this.router.navigate(['/pages'], {})
  }
  changehandler(info: PouchDB.Replication.SyncResult<any>) {
    this.zone.run(() => {
      // get login info here 

    });
  }
  sync(db: PouchDB.Database<any>, url: string, changecb?: Function, pausdedcb?: Function, activecb?: Function, deniedcb?: Function, completecb?: Function, errcb?: Function) {
    let parent = this;
    db.sync(url, {
      live: true,
      retry: true
    }).on('change', async (info) => {
      console.log('sync res');
      console.log(info);
      if (info.direction == "pull") {
        console.log('PULL UPDATE');
        changecb(info);

      }
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

    // url = 'ws://localhost:1315/';


    // //this.db  = new socketpouch(this.fulldbname,{adapter: 'socket', name: this.fulldbname,auth:{username:'userx',password:'passx'}});
    // // testonly
    // let remote  = new socketpouch({socketOptions: {},url:url,adapter: 'socket', name: this.fulldbname,auth:{username:'userx',password:'passx'}},(r,e)=>{
    // console.log(r);
    //  console.log(e);

    // });
    // console.log('start sync');
    // let opts={
    //   live: true,
    //   retry: true,
    // }
    // console.log(remote);
    // this.db.sync(remote,opts).on('change', async (info) => {
    //   console.log('sync res');
    //   console.log(info);
    //   if (info.direction == "pull") {
    //     console.log('PULL UPDATE');
    //     this.zone.run(() => {
    //       parent.loadList();
    //     })

    //   }
    // }).on('paused', function (err) {
    //   // replication paused (e.g. replication up to date, user went offline)
    //   console.log('paused');

    // }).on('active', function () {
    //   // replicate resumed (e.g. new changes replicating, user went back online)
    //   console.log('active');
    // }).on('denied', function (err) {
    //   // a document failed to replicate (e.g. due to permissions)
    //   console.log('denied');
    // }).on('complete', function (info) {
    //   // handle complete
    // }).on('error', function (err) {
    //   console.log('sync err');
    //   console.log(err);
    // });





















    //var client = PouchSync.createClient();
    // var sync = client.sync(this.db, {
    //   //remoteName: 'todos-server', // name remote db is known for
    //   credentials: { token: 'OK' } // arbitrary
    // });
    // client.connect(url);
    // client.emit('connect') // when connects
    // client.emit('disconnect') // when gets disconnected
    // client.emit('reconnect') // when starts attempting to reconnect
    // sync.emit('change', (change)=>{
    //   console.log(change);
    // });
    // sync.emit('paused')
    // sync.emit('active')
    // sync.emit('denied')
    // sync.emit('complete')
    // sync.emit('error', (err)=>{
    //   console.log(err);

    // });
    //sync.cancel();
    //  remote.sync(url,{
    // this.db.sync(url, {
    //   live: true,
    //   retry: true
    // }, (err, res) => {
    //   console.log(err);
    //   console.log(res);
    // }).on('change', async (info) => {
    //   console.log('sync res');
    //   console.log(info);
    //   if (info.direction == "pull") {
    //     console.log('PULL UPDATE');
    //     this.zone.run(() => {
    //       parent.loadList();
    //     })

    //   }
    // }).on('paused', function (err) {
    //   // replication paused (e.g. replication up to date, user went offline)
    //   console.log('paused');

    // }).on('active', function () {
    //   // replicate resumed (e.g. new changes replicating, user went back online)
    //   console.log('active');
    // }).on('denied', function (err) {
    //   // a document failed to replicate (e.g. due to permissions)
    //   console.log('denied');
    // }).on('complete', function (info) {
    //   // handle complete
    // }).on('error', function (err) {
    //   console.log('sync err');
    //   console.log(err);
    // });

  }

}
