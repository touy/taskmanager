import { Injectable } from '@angular/core';
import axios from 'axios'
import { HttpClient } from '@angular/common/http';
import { Igijuser, MyDataBaseNames, Irolelist, Orolelist, Utils, Systemlist, Iclient, LogTypes, Loginfo, Idbconfig, Xdbconfig, Iuser, Globalcommands, Oclient } from './interface';
import pouchdbwebsql from 'pouchdb-adapter-websql';
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import PouchAuth from 'pouchdb-authentication';
import Auth from 'pouchdb-auth';
import pouchSecurity from 'pouchdb-security-helper';
import pouchdb from 'pouchdb';
import { NgZone } from '@angular/core';

import { mFuncs } from './searchFunctions';

export class mHelper {
    currentsystem: 'TASK_MANAGER_WEB';
    db: PouchDB.Database<any>;
    db_p_logging: PouchDB.Database<any>;
    db_g_logging: PouchDB.Database<any>;
    db_person_no: PouchDB.Database<any>;
    db_email_no: PouchDB.Database<any>;
    db_msg: PouchDB.Database<any>;
    db_sms_no: PouchDB.Database<any>;
    db_global_no: PouchDB.Database<any>;
    db_user: PouchDB.Database<any>;
    _client: Iclient;
    myuser: Iuser;
    mydbconfig: Idbconfig;
    dbconfig: Idbconfig;
    //remoteCouch: string = MyDataBaseNames.remoteCouch; // DEVELOPING ENV ONLY
    fulldbname: string;
    dbname: string;
    serverurl: string;
    fullurl: string;
    zone: NgZone;
    _selectedObj: any;
    _arrayObj: Array<any>;
    currentsync: PouchDB.Replication.Sync<any>;
    clientsync: PouchDB.Replication.Sync<any>;
    db_client: PouchDB.Database<{}>;
    constructor(zone: NgZone) {
        this.zone = zone; // if not need to update from parent 


        pouchdb.plugin(Auth);
        pouchdb.plugin(pouchdbwebsql);
        pouchdb.plugin(PouchAuth);
        pouchdb.plugin(pouchSecurity);

        // for login only need to get remote couch when init
        this.initconnection();

    }
    gettemprefix(){
        this._client=new Oclient();
        let url = `${MyDataBaseNames.taskmanagerserver}${MyDataBaseNames.dbtempprefix}`;
        axios.post(url,this._client).then(res=>{
            this._client=JSON.parse(res.data) as Iclient;
        }).catch(err=>{
            console.log(err);
        });
    }
    initconnection() {
        // need to get remote couch secretly
        // TODO: 1
        this.serverurl = MyDataBaseNames.remoteCouch// use default remoteCouch server
        let url = MyDataBaseNames.remoteCouch + MyDataBaseNames.dbsystemuser;
        this.db_user = new pouchdb(url, { skip_setup: true });
    }
    initNotificationServices() {

        let personalnodbname = `${this.dbconfig.prefixname}${MyDataBaseNames.dbpersonalno}${this.mydbconfig.prefix}`;
        let globalnodbname = `${this.mydbconfig.prefixname}${MyDataBaseNames.dbglobalno}${this.mydbconfig.prefix}`;
        let personloggingdbname = `${this.mydbconfig.prefixname}${MyDataBaseNames.dbpersonallogging}${this.mydbconfig.prefix}`;
        let globalloggingdbname = `${MyDataBaseNames.dbgloballlogging}`;
        let smsnodbname = `${MyDataBaseNames.dbsmsno}${this.mydbconfig.prefix}`;
        let emailnodbname = `${MyDataBaseNames.dbemailno}${this.mydbconfig.prefix}`;
        let msgnodbname = `${MyDataBaseNames.dbmsg}${this.mydbconfig.prefix}`;
        let clientdbname = `${MyDataBaseNames.dbclient}${this.mydbconfig.prefix}`;
        try {
            this.db_p_logging = new pouchdb(personloggingdbname, { adapter: 'websql' });
            this.db_g_logging = new pouchdb(globalloggingdbname, { adapter: 'websql' });
            this.db_global_no = new pouchdb(globalnodbname, { adapter: 'websql' });
            this.db_person_no = new pouchdb(personalnodbname, { adapter: 'websql' });
            this.db_sms_no = new pouchdb(smsnodbname, { adapter: 'websql' });
            this.db_email_no = new pouchdb(emailnodbname, { adapter: 'websql' });
            this.db_msg = new pouchdb(msgnodbname, { adapter: 'websql' });
            this.db_client = new pouchdb(clientdbname, { adapter: 'websql' });
        } catch (error) {
            this.db_p_logging = new pouchdb(personloggingdbname);
            this.db_g_logging = new pouchdb(globalloggingdbname);
            this.db_global_no = new pouchdb(globalnodbname);
            this.db_person_no = new pouchdb(personalnodbname);
            this.db_sms_no = new pouchdb(smsnodbname);
            this.db_email_no = new pouchdb(emailnodbname);
            this.db_msg = new pouchdb(msgnodbname);
            this.db_client = new pouchdb(clientdbname);
        }

        // notification for a prefixname+prefix ==> global prefix
        // notification for a prefixname+role.groupname+prefix ==> group prefix

        // internal msg a prefixname+msg+prefix ==> internal msg
        // private msg a msg+privateprefix ==> private msg


        // follow doc/job
    }
    startworkingwithDB(dbname: string) {

        this.dbconfig = this.myuser.metadata.dbconfig.find(x => {
            return x.dbname === dbname && !x.isprivate;
        });
        if (!this.dbconfig) { alert('NO CONFIG'); throw new Error('NO CONFIG'); }
        this.fulldbname = `${this.dbconfig.prefixname}${dbname}${this.dbconfig.prefix}`;
        this.serverurl = this.dbconfig.serverurl;
        this.fullurl = `${this.dbconfig.serverurl}${this.fulldbname}`;
        try {
            this.db = new pouchdb(this.fulldbname, { adapter: 'websql' });
        } catch (error) {
            console.log(error);

            this.db = new pouchdb(this.fulldbname);
            console.log('use IndexDB instead!');
        }
        this.startservices();
    }
    // need to login first
    startservices() {
        this.initNotificationServices();
        this.sync();
        this.sync_client();
    }
    sync(changecb?: Function, pausdedcb?: Function, activecb?: Function, deniedcb?: Function, completecb?: Function, errcb?: Function) {

        if (this.db) {
            let parent = this;
            this.currentsync ? this.currentsync.cancel() : this.currentsync;
            this.currentsync = this.db.sync(this.fullurl, {
                live: true,
                retry: true
            }).on('change', async (info) => {
                console.log('sync res');
                console.log(info);
                if (info.direction == "pull") {
                    console.log('PULL UPDATE');
                    changecb(info); // callback to caller
                }
            }).on('paused', function (err) {
                // replication paused (e.g. replication up to date, user went offline)
                console.log('paused');
                pausdedcb(err);

            }).on('active', function () {
                // replicate resumed (e.g. new changes replicating, user went back online)
                console.log('active');
                activecb();
            }).on('denied', function (err) {
                // a document failed to replicate (e.g. due to permissions)
                console.log('denied');
                deniedcb();
            }).on('complete', function (info) {
                // handle complete
                completecb();
            }).on('error', function (err) {
                console.log('sync err');
                console.log(err);
                errcb(err);
            });
        } else {
            console.log('NO SYNC');

        }
    }
    sync_client(changecb?: Function, pausdedcb?: Function, activecb?: Function, deniedcb?: Function, completecb?: Function, errcb?: Function) {
        if (this.db_client) {
            let parent = this;
            let clienturl = `${MyDataBaseNames.dbclient}${this.mydbconfig.prefix}`;
            parent.clientsync ? parent.clientsync.cancel() : this.clientsync;
            parent.clientsync = parent.db_client.sync(clienturl, {
                live: true,
                retry: true
            }).on('change', async (info) => {
                console.log('sync res');
                console.log(info);
                if (info.direction == "pull") {
                    console.log('PULL UPDATE');
                    changecb(info); // callback to caller
                    parent._client=info.change.docs[0] as Iclient;
                }
            }).on('paused', function (err) {
                // replication paused (e.g. replication up to date, user went offline)
                console.log('paused');
                pausdedcb(err);

            }).on('active', function () {
                // replicate resumed (e.g. new changes replicating, user went back online)
                console.log('active');
                activecb();
            }).on('denied', function (err) {
                // a document failed to replicate (e.g. due to permissions)
                console.log('denied');
                deniedcb();
            }).on('complete', function (info) {
                // handle complete
                completecb();
            }).on('error', function (err) {
                console.log('sync err');
                console.log(err);
                errcb(err);
            });
        } else {
            console.log('NO SYNC');

        }
    }





    update(id: string = '', rev: string = '', isdelete: boolean = false) {
        // new : rev =''
        // delete : isdelete =true
        if (!isdelete) {
            if (id && rev && !isdelete) { // edit      
            } else if (!id && !rev && !isdelete) {// add new
                //this._selectedObj._id = nano_time.now();
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
    get(id: string | Array<{ id: string, rev: string }>) {
        if (id) {
            if (Array.isArray(id)) {
                //[{_id:'',_rev:''}]
                this.db.bulkGet({ docs: id })
            } else {
                this.db.get(id).then(res => {
                    this._selectedObj = res as Irolelist;
                }).catch(err => {
                    console.log(err);
                });
            }

        } else {
            console.log('empty id');
            this._selectedObj = new Orolelist();
        }

    }
    async loadList(pz: number = 10, index: number = 0) {
        let maxpage = pz;
        let offset = index;
        let parent = this;
        let arr = new Array<typeof parent.db>();

        arr = await this.db.allDocs({ limit: maxpage, skip: offset, descending: true, include_docs: true, }).then(res => {
            for (let index = 0; index < res.rows.length; index++) {
                const element = res.rows[index].doc;
                arr.push(element as (typeof parent.db))
            }
            console.log('load finished');
            return arr;
        });
        //this._arrayObj$ = of(arr).delay(1000);

        this.zone.run(() => {
            // get login info here 
            parent._arrayObj = arr;
        });
    }

























    login(username: string, password: string) {
        this.db_user.logIn(username, password).then(res => {
            // sync client here  
            this.db_user.getUser(username).then(res => {
                this.myuser = res;
                this.mydbconfig = this.myuser.metadata.dbconfig.find((x) => {
                    return x.isprivate
                })
            }).catch(err => {
                this.logging(username, Systemlist.taskmanagerweb, this._client, LogTypes.error, err.message, 'LOGIN')
                console.log((err));
                // sync client here
            });
        }).catch(err => {
            this.logging(username, Systemlist.taskmanagerweb, this._client, LogTypes.error, err.message, 'LOGIN')
            console.log((err));

        });
    }
    logout() {
        this.db_user.logOut().then(res => {
            console.log('OK LOGGED OUT');
            this.logging(this.myuser.name, Systemlist.taskmanagerweb, this._client, LogTypes.failed, 'log out failed', 'LOGOUT');
        }
        ).catch(err => {
            console.log(err);

            //this.logging()
        });
        this.stopallservices();
    }
    changepassword(newpassword: string) {
        let parent = this;
        this.db_user.changePassword(this.myuser.name, newpassword, function (err, response) {
            if (err) {
                throw new Error(err.message);

            } else {
                console.log('Change password succeeded');
                parent.logging(parent.myuser.name, parent.currentsystem, parent._client, LogTypes.success, 'change password', 'change password 339')
            }
        })
    }
    
    register(user:Igijuser) {
        let parent = this;
        // validat phone , .......
        if(!this._client.gui){
            this.gettemprefix();
        }
        this._client.data.user=user;
        this._client.data.command=Globalcommands.register;
        let db = new pouchdb(`${MyDataBaseNames.dbclient}-${this._client.gui}`);// temporary prefix
        db.put(this._client).then(res=>{
            console.log(res);// client has been created and need to activate the key for registration.
            // redirect to activate keys on user's GUI
        }).catch(err=>{
            console.log(err);
        });
    }
    //put link with /activate/newuser/email/keys
    async activatekeys(keys:string){
        
        let url=`${MyDataBaseNames.taskmanagerserver}activatekeys/${keys}`;
        let r =await axios.get(url);// after get need to go to reset password page
        // at first reset password, auto login first then reset password.
        // after that go to the profile page or go to dash board of the system that you user login
        console.log(r);
        return r;
        
    }
    
    

    stopallservices() {
        this.currentsync.cancel();
        this.clientsync.cancel();
        ///......................
    }
    /// from accepted user , sending given keys to the system to assign the permission to each prefix tables 
    // gijuser + private prefix 

    assigntpermissiondb(params: { dbname: string, username: string, role: string, isadmin: boolean },
        dbconfig: {}) {
        let { dbname, username, role, isadmin } = params;
        // prefixname-dbname-prefix
        let url: string = '';
        if (username.indexOf('org.couchdb.user:') < 0) {
            username = 'org.couchdb.user:' + username;
        }
        let dbassign = new pouchdb(url, { skip_setup: false });
        let security = dbassign.security();
        security.fetch().then(() => {
            // add superadmin as role to members and admins
            if (isadmin) {

            } else {

            }
            security.members.roles.add("user");
            security.admins.roles.add("admin");

            return security.save();
        }).catch(e => {
            console.error(e);
        });
    }





























    async searchstartendkey(searchkey: string, func: string, dbname: string, ps: number = 5, index: number = 0) {
        //return this.db.query('by_timestamp', {endkey: when, descending: true});
        let pagesize: number = ps;
        let offset = index;

        return await this.db.query(this.searchfunction(dbname, func), {
            startkey: searchkey, endkey: searchkey + '\uffff', descending: true, include_docs: true,
            limit: pagesize, skip: offset
        });
    }
    searchfunction(dbname: string, func: string): any {
        switch (`${func}${dbname}`) {
            case `${mFuncs.funcNames.searchRoleByRoleNameFunc}${MyDataBaseNames.dbrolelist}`:
                return mFuncs.searchRoleByRoleNameFunc;
                break;

            default:
                break;
        }
    }




    logging(user: string | undefined,
        system: string | undefined,
        client: Iclient | undefined,
        type: LogTypes | undefined,
        message: string | undefined,
        src: string | undefined) {
        let l = new Loginfo();
        l.logtime/// need to set to +7 tz
        l.user = user;
        l.system = system;
        l.client = client;
        l.type = type;
        l.message = message;
        l.src = src;
    }
    personalnotification(msg) {

    }
    emailnotification(msg) {

    }
    smsnotification(msg) {

    }
    globalnotificatoin(msg) {

    }
    msgnotification(msg) {

    }
    changehandler(info: PouchDB.Replication.SyncResult<any>) {
        this.zone.run(() => {
            this._arrayObj
            // get login info here 
        });
    }
}