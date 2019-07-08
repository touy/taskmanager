import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Igijuser, Ogijuser, nano_time, MyDataBaseNames, Irolelist, Orolelist, OmySystem } from '../../interface';
import pouchdb, { emit } from 'pouchdb';
//import socketpouch from 'socket-pouch/client';
import pouchdbwebsql from 'pouchdb-adapter-websql';
// import PouchSync from 'pouch-websocket-sync';
// import websocket from 'websocket-stream';
import { ModalRoleListComponent } from './modal-rolelist/modal-rolelist.component'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import PouchAuth from 'pouchdb-authentication';
// export const staggeranimation=trigger('races', [
//   transition('* => *', [
//     query(':leave', [
//       stagger(500, [
//         animate(1000, style({ opacity: 0 }))
//       ])
//     ], { optional: true }),
//     query(':enter', [
//       style({ opacity: 0 }),
//       animate(1000, style({ opacity: 1 }))
//     ], { optional: true })
//   ])
// ]);

@Component({
  selector: 'ngx-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  //animations:[staggeranimation]
})
export class RoleListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('destroy role list');
  }


  private db: PouchDB.Database<{}>;
  dbname: string = MyDataBaseNames.dbrolelist;
  remoteCouch = MyDataBaseNames.remoteCouch;
  fulldbname: string;
  _selectedObj: Irolelist;
  _arrayObj: Array<Irolelist>;
  _system = new OmySystem('task-manager');
  _parent = new Array('task-manager-admin');

  constructor(public zone: NgZone, private dialogService: NbDialogService, private router: Router, private _location: Location) {
    this._selectedObj = new Orolelist();
    this._arrayObj = new Array<Irolelist>();

    // prefixname+dbname+prefix;
    this.fulldbname = 'prefixname' + MyDataBaseNames.dbrolelist + 'prefix';
    let url = this.remoteCouch + this.fulldbname;
    console.log('dbname url', this.fulldbname, url);

    pouchdb.plugin(pouchdbwebsql);
    pouchdb.plugin(PouchAuth);

    //pouchdb.adapter(socketpouch);
    this.db = new pouchdb(this.fulldbname, { adapter: 'websql' });
    this.sync(url);
  }

  ngOnInit() {
    this.loadList();
  }
  sync(url) {
    let parent = this;

    this.db.sync(url, {
      live: true,
      retry: true
    }).on('change', async (info) => {
      console.log('sync res');
      console.log(info);
      if (info.direction == "pull") {
        console.log('PULL UPDATE');
        this.zone.run(() => {
          parent.loadList();
        })

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

    // url = 'ws://localhost:1314/';
    // var client = PouchSync.createClient();
    // console.log('start sync');
    // let opts = {
    //   live: true,
    //   retry: true,
    // }
    // console.log(client);
    // var sync = client.sync(this.db, {
    //   remoteName: MyDataBaseNames.remoteCouch+MyDataBaseNames.dbrolelist, // name remote db is known for
    //   credentials: { token: 'some token' } // arbitrary
    // });

    // client.connect(url);

    // client.emit('connect') // when connects
    // client.emit('disconnect') // when gets disconnected
    // client.emit('reconnect') // when starts attempting to reconnect
    // //sync.emit('change', change)
    // sync.emit('paused')
    // sync.emit('active')
    // sync.emit('denied')
    // sync.emit('complete')
    // //sync.emit('error', err)











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
  update(id: string = '', rev: string = '', isdelete: boolean = false) {
    // new : rev =''
    // delete : isdelete =true
    if (!isdelete) {
      if (id && rev && !isdelete) { // edit      
      } else if (!id && !rev && !isdelete) {// add new
        this._selectedObj._id = nano_time.now();
      }
      this.db.put(this._selectedObj).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    } else {
      if (id && rev) { // delete
        this.db.remove(id, rev).then(res => {
          console.log(res);

        }).catch(err => {
          console.log(err);

        });
      }
      else {
        console.log('NOTHING');
      }
    }



  }
  get(id) {
    if (id) {
      this.db.get(id).then(res => {
        this._selectedObj = res as Irolelist;
      }).catch(err => {
        console.log(err);
      });
    } else {
      console.log('empty id');
      this._selectedObj = new Orolelist();
    }

  }
  async loadList() {
    let maxpage = 10;
    let offset = 0;
    let parent = this;
    let arr = new Array<Irolelist>();
    arr = await this.db.allDocs({ limit: maxpage, skip: offset, descending: true, include_docs: true, }).then(res => {
      for (let index = 0; index < res.rows.length; index++) {
        const element = res.rows[index].doc;
        arr.push(element as Irolelist)
      }
      console.log('load finished');
      return arr;
    });
    //this._arrayObj$ = of(arr).delay(1000);
    this._arrayObj = arr;
  }
  edit(id: string = '', rev: string = '', isdelete: boolean = false) {
    let dlg = this.dialogService.open(ModalRoleListComponent, {
      context: {
        _id: id,
        _rev: rev,
        isdelete: isdelete,
      }
    });
    dlg.onClose.subscribe(result => {
      if (result ? (result.command == 'update' ? true : false) : false) {
        this.loadList();
      }
    });
  }
  searchrolename(searchkey) {
    //return this.db.query('by_timestamp', {endkey: when, descending: true});
    let pagesize = 5;
    let offset = 0;
    return this.db.query(this.searchrolenameFunc, {
      startkey: searchkey, endkey: searchkey + '\uffff', descending: true, include_docs: true,
      limit: pagesize, skip: offset
    });
  }
  searchrolenameFunc(doc: Irolelist) {
    if (doc.rolename) {
      emit(doc.rolename);
    }
  }
}