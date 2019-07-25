
import * as Nano from 'nano';
import { MapType } from '@angular/compiler';
export class Utils {
    static now() {
        // const nano_time = require('nano-time');
        // return nano_time.now();
        return (Date.now() * 999999.99) + '';
    }
    static toDay() {

    }
    static createUrl(prefixname: string, dbname: string, prefix: string) {
        return `${prefixname}-${dbname}-${prefix}`;
    }
    static readonly timefromat: string = 'YYYY-MM-dd HH:mm:ss';
}
export interface Iinvitation { // user list could be shown on that prefix, if there is
    // no invitation accepted then sender or other user in prefix could not see that username on the list
    // 1. invitation would be within prefix when reciever accept ,
    // 2. public invitaion request from admin only

    _id: string;
    _rev: string;
    sender: string;
    receiver: string;
    senttime: string; // by reciever
    accepttime: string;
    prefixname: string;
    prefix: string;
    isactive: boolean; // by sender
    isaccepted: boolean; // by reciever
    owners: string;
    lastupdate: string;
    creator: string;
}
export class Oinvitation implements Iinvitation { // user list could be shown on that prefix, if there is
    // no invitation accepted then sender or other user in prefix could not see that username on the list
    // 1. invitation would be within prefix when reciever accept ,
    // 2. public invitaion request from admin only

    _id: string;
    _rev: string;
    sender: string;
    receiver: string;
    senttime: string;
    accepttime: string; // by reciever
    prefixname: string;
    prefix: string;
    isactive: boolean; // by sender
    isaccepted: boolean; // by reciever
    owners: string;
    lastupdate: string;
    creator: string;
    constructor() {

    }
}

export class Mworkstatus {
    static readonly pending: 'pending';
    static readonly processing: 'processing';
    static readonly succeeded: 'succeeded';
    static readonly canceled: 'canceled';
}
export class Commonenames {
    static readonly admin: 'admin';
    static readonly user: 'user';
    static readonly owner: 'owner';
    static readonly anyone: 'anyone';
    static readonly guest: 'guest';
    static readonly anonymous: 'anonymous';
    static readonly member: 'member';
    static readonly root: 'root';
    static readonly default: 'default';
}
export class Permissionstatus {
    static readonly read: 'read';
    static readonly none: 'none';
    static readonly readwrite: 'readwrite';
}
export class Systemlist {
    static readonly icemaker: 'icemaker';
    static readonly taskmanager: 'taskmanager';
    static readonly taskmanagerweb: 'taskmanagerweb';
    static readonly usermanager: 'usermanager';
    static readonly system: 'system';
    static readonly admin: 'admin';
}
export class LogTypes {
    static readonly info = 'info';
    static readonly warning = 'warning';
    static readonly error = 'error';
    static readonly cancel = 'cancel';
    static readonly failed = 'failed';
    static readonly success = 'success';
    static readonly ok = 'ok';
}
export class Loginfo {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;

    logtime: string | undefined;
    user: string | undefined;
    system: Systemlist | undefined;
    client: Iclient | undefined;
    type: LogTypes | undefined;
    message: string | undefined;
    src: string | undefined;
    constructor() {
        this.logtime = new Date().toISOString();
    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}











///////////////////////////////
////////////////////////
///////////
// VOTE PROJECT

export interface Iinvoice { // private for user
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
    billnumber: string | undefined;
    createtime: string | undefined;
    totalpayment: string | undefined;
    payto: string | undefined;
    payamount: number;
    description: string | undefined;
}

export interface Ipins { // private for user , private for system admin
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
    createdtime: string | undefined;
    provider: string | undefined;
    isvalid: string | undefined;
    pinnumber: string | undefined;
    commission: number | undefined;
    value: number | undefined;
}
// poster is a user, audience is a user
export interface Imediacontent { // r member , w/r owner
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
    name: string | undefined;
    createdtime: string | undefined;
    isactive: boolean;

    olemedia: Array<Imediacontent>;
    link: string | undefined;
    click: Array<Imediaclick>;
    comments: Array<Imediacomment>;
    like: Array<Imedialike>;
    mediapay: Array<Iinvoice>;
    mediakeys: string | undefined;
    awardid: string | undefined;
}
export interface Imedialike { // r create by admin
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
    createdtime: string | undefined;
    islike: boolean;
}
export interface Imediacomment { // r create by admin
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
    createdtime: string | undefined;
    isactive: boolean;
    comment: string | undefined;
    usercomment: string | undefined;
}
export interface Imediaclick { // r create by admin
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
    createdtime: string | undefined;
    userclick: string | undefined;
}
export interface Iaward { // r create by admin
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
    name: string | undefined;
    value: number | undefined;
    description: string | undefined;
    start: string | undefined;
    end: string | undefined;

    awardkeys: Array<Iawardkeys>;
}
export interface Iawardkeys { // r create by admin
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
    touser: string | undefined;
    keys: string | undefined;
}
export interface Iticket { // public and private but r only create by admin
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
    ticketkeys: string | undefined;
    ticketvalue: string | undefined;
    createdtime: string | undefined;
    award: string | undefined;
    mediacontent: string | undefined;
}
export interface Ivotereport { // public r only create by admin
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
    reportname: string | undefined;
    report: string | undefined;
}
///////////////////////////////
////////////////////////
///////////
// VOTE PROJECT











// prefixname-databasename-prefix
// POS-user-sabai
// POS-user-somchay
// POS-user-somchay2
/// Database name
// NEED to work with this after register a new prefix

// NO PRFIX PUBLIC TO ALL
export interface Iactivatekeys {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    activatekeys: string | undefined;
    creator: string | undefined; // system;
    action: string | undefined; // register a new user  , forgot password
    createdtime: string | undefined;
    expiretime: string | undefined;
    activatetime: string | undefined;
    activatedby: string | undefined;
    tousername: string | undefined;
    isactive: boolean | undefined;
}
// NO PRFIX PUBLIC TO ALL
export class Oactivatekeys implements Iactivatekeys {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    activatekeys: string | undefined;
    creator: string | undefined; // system;
    action: string | undefined; // register a new user  , forgot password
    createdtime: string | undefined;
    expiretime: string | undefined;
    activatetime: string | undefined;
    activatedby: string | undefined;
    tousername: string | undefined;
    isactive: boolean | undefined;
}
// for PRIVATE , dbname-prefix
export interface Idbconfig {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    prefixname: string | undefined;
    dbname: string | undefined;
    prefix: string | undefined;
    serverurl: string | undefined;
    fullurl: string | undefined;
    fulldbname: string | undefined;
    username: string | undefined;
    isprivate: boolean | undefined;
    configname: string | undefined;
    authorizedkeys: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
}
export class Odbconfig implements Idbconfig {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    prefixname: string | undefined;
    dbname: string | undefined;
    prefix: string | undefined;
    fulldbname: string | undefined;
    username: string | undefined;
    serverurl: string | undefined;
    fullurl: string | undefined;
    isprivate: boolean | undefined;
    configname: string | undefined;
    authorizedkeys: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
}
export class Xdbconfig extends Odbconfig {
    constructor(configname: string,
        prefixname?: string, dbname?: string,
        prefix?: string, username?: string, serverurl?: string) {
        super();
        this.prefixname = prefixname;
        this.dbname = dbname;
        this.prefix = prefix;
        this.username = username;
        this.serverurl = serverurl;
        this.configname = configname;
    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
    setAutorizedKeys(key: string) {
        this.authorizedkeys = key;
    }
    setconfigname(name: string) {
        this.configname = name;
    }
    setprivate() {
        this.isprivate = true;
    }
    getfulldbname() {
        return this.fulldbname = `${this.prefixname}${this.dbname}${this.prefix}`;
    }
    getfullurl(serverurl: string | undefined) {

        return this.fullurl = `${this.serverurl}${this.prefixname}${this.dbname}${this.prefix}`;
    }
}
// OBJECT FRO DATA TRANSMISSION ONLY
export interface Isecurityuser {
    names: Array<string>;
    roles: Array<string>;
}
export class Osecurityuser implements Isecurityuser {
    names: Array<string>;
    roles: Array<string>;
}
export class Xsecurityuser extends Osecurityuser {
    constructor(names: string | Array<string>, roles: string | Array<string>) {
        super();
        this.addName(names);
        this.addRole(roles);
    }
    getNames() {
        return this.names;
    }
    getRoles() {
        return this.roles;
    }
    addName(x: string | Array<string>) {
        return x ? Array.isArray(x) ? x.map(y => this.names.push(y)) : this.names.push(x) : this.names;
    }
    addRole(x: string | Array<string>) {
        return x ? Array.isArray(x) ? x.map(y => this.roles.push(y)) : this.roles.push(x) : this.roles;
    }
    removeName(x: string) {
        return this.names = this.names.filter(n => n !== x);
    }
    removeRole(x: string) {
        return this.roles = this.roles.filter(n => n !== x);
    }
    clearNames() {
        return this.names.length = 0;
    }
    clearRoles() {
        return this.roles.length = 0;
    }
    reset() {
        this.roles.length = 0;
        this.names.length = 0;
    }
}
export interface Isecurity {
    admins: Array<Isecurityuser>;
    members: Array<Isecurityuser>;
}
export class Osecurity implements Isecurity {
    admins: Array<Isecurityuser>;
    members: Array<Isecurityuser>;
}
export class Xsecurity extends Osecurity {
    constructor() {
        super();
    }
    /// TEST ONLY THEN REMOVE THIS BELOW LATER
    getJson() {
        return this as Isecurity;
    }


}



/// FOR SYSTEM USERS which only system admin can work
// normal user can pull its data only
// NO PREFIX
export class Iuser {
    _id: string | undefined;
    metadata: {
        dbconfig: Array<Idbconfig> | undefined,
        data: Igijuser,
        activatekeys: string,
    };
    name: string | undefined;
    password: string | undefined;
    roles: Array<string> | undefined;
    type: string | undefined;
}

export class Ouser implements Iuser {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    metadata: {
        dbconfig: Array<Idbconfig> | undefined,
        data: Igijuser,
        activatekeys: string,

    };
    name: string;
    password: string;
    roles: Array<string>;
    type: string;
}
// new Ouser().roles.filter(x => new Array().includes(x));
export class Xuser extends Ouser {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    name: string;
    password: string;
    roles: Array<string>;
    type: string;
    constructor(name: string, password?: string,
        roles?: Array<string> | string, dbconfig?: Array<Idbconfig> | Idbconfig) {
        super();
        this.type = Commonenames.user;
        this.name = name;
        this.password = password;
        this._id = `org.couchdb.user:${name}`;
        roles ? Array.isArray(roles) ? roles.map(x => this.roles.push(x)) : this.roles.push(roles) : this.roles;
        this.metadata ? Array.isArray(dbconfig) ?
        dbconfig.map(x => this.metadata.dbconfig.push(x)) :
        this.metadata.dbconfig.push(dbconfig) : this.metadata;
    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
    setAdmin() {
        this.type = Commonenames.admin; /// FOR SYSTEM ADMIN ONLY
    }
}


/// for system only
export class Osettingvaluenames {
    auto: 'auto';
    disable: 'disable';
    enable: 'enable';
}

export class Osettingobj {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    name: Osettingvaluenames | undefined;
    value: string | undefined;
    type: string | undefined;
    description: string | undefined;
    force: boolean;
}

export class Osetting {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    dblink: string | undefined;
    settings: Array<Osettingobj>;
}
export class Personalsetting extends Osetting {
    dblink: string | undefined;
    constructor() {
        super();
    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}
export interface Imsggroup {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    members: Array<Iuser>;
    admin: Array<Iuser>;
    oldadmin: Array<Iuser>;
    deletedmember: Array<Iuser>;
    banmembers: Array<Iuser>;
    msgcomlink: string | undefined;
    msggroupname: string | undefined;
}
export class Omsggroup implements Imsggroup {
    _id: string; _rev: string | undefined;
    isdefault: string | undefined;
    lastupdate: string | undefined;

    members: Array<Iuser>;
    admin: Array<Iuser>;
    oldadmin: Array<Iuser>;
    deletedmember: Array<Iuser>;
    banmembers: Array<Iuser>;
    creator: Iuser;
    defaultadmin: Array<Iuser>;
    msgcomlink: string;
    msggroupname: string;
}
export class Imsgactioname {
    typing: 'typing';
    audio: 'audio';
    vdo: 'vdo';
}
export class Msgaction {
    username: string | undefined;
    action: Imsgactioname;
}
export interface Imsgcom {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    sender: string | undefined;
    receiver: string | undefined;
    senttime: string | undefined;
    receivedtime: string | undefined;
    status: string | undefined;
    attachedfile: Array<IObj> | undefined;
    attachedfilesize: string | undefined;
    attachedfilename: string | undefined;
    action: Array<Msgaction> | undefined;
}
export class MyDataBaseNames {
    // static readonly dbuser: string = 'g-users-';
    static readonly dbprofile: string = 'g-profile-';
    static readonly dbuserprefix: string = 'g-userprefix-';
    static readonly dbjob: string = 'g-job-';
    static readonly dbdoc: string = 'g-doc-';
    static readonly dbmember: string = 'g-member-';
    static readonly dbpermission: string = 'g-permission-';
    static readonly dbapprove: string = 'g-approve-';
    static readonly dbrole: string = 'g-role-';
    static readonly dbrolelist: string = 'g-role-list-';
    static readonly dbuserrole: string = 'g-user-role-';
    // static readonly dbuserpermission: string = 'g-user-permision-';
    // static readonly dbuserpermissionassigned: string = 'g-user-permission-assigned-';
    static readonly dbpermissionassigned: string = 'g-user-permission-assigned-';
    // static readonly dbpermissionrequest: string = 'g-user-permission-request-';

    static readonly dbencryptionkeys: string = 'g-user-encryption-keys-';
    static readonly dbauthorizedkeys: string = 'g-authorized-keys-';
    static readonly dbclient: string = 'g-system-client-';
    static readonly dbgijuser: string = 'g-system-gijuser-';
    static readonly dbscore: string = 'g-system-score-';
    static readonly dbreport: string = 'g-system-report-';
    static readonly dbconfig: string = 'g-system-config-';
    static readonly dbinvitation = 'g-system-invitation-';

    static readonly dbsystemuser = '_users';
    static readonly dbtempprefix = 'tempprefix';

    static readonly dbpersonalno: string = 'g-personal-notification-';
    static readonly dbglobalno: string = 'g-global-notification-';
    static readonly dbpersonallogging: string = 'g-personal-loggin-';
    static readonly dbgloballlogging: string = 'g-global-loggin-';
    static readonly dbsmsno: string = 'g-sms-notification-';
    static readonly dbemailno: string = 'g-email-notification-';
    static readonly dbmsg: string = 'g-dbmsg-';
    // BY DEFAULT FOR DEVELOPMENT PURPOSE ONLY
    static readonly remoteCouch: string = 'http://admin:admin@localhost:5984/';
    static readonly taskmanagerserver: string = 'http://localhost:1314/';
}
export class Systemdefaultadmin {
    static readonly icemaker_admin: string = 'icemaker-admin';
    static readonly taskmanager_admin: string = 'taskmanager-admin';
    static readonly usermanager_admin: string = 'taskmanager-admin';
}

export class Globalcommands {
    static readonly login = 'login';
    static readonly logout = 'logout';
    static readonly changepassword = 'changepassword';
    static readonly register = 'register';
    static readonly addnewuser = 'addnewuser';
    static readonly addnewadmin = 'addnewadmin';
    static readonly changepasswordadmin = 'changepasswordadmin';
    static readonly updateadmin = 'updateadmin';
    static readonly getadmin = 'getadmin';
    static readonly getlistadmin = 'getlistadmin';
    static readonly getlistuser = 'getlistuser';
    static readonly setdatabasepermission = 'setdatabasepermission';

    static readonly update = 'update';
    static readonly getlist = 'getlist';
    static readonly get = 'get';

    static readonly serverreturnerror = 'serverreturnerror'; // server reject commmand check data.message
    static readonly serverreturnsuccess = 'serverreturnsuccess'; // server reject commmand check data.message
}
/// prefixname-dbname-prefix
// prefix : 1. private ==> userprofile-12345 , user-12345
// prefix : 2. group ==> user-g12345 , userprofile-g12345


// CLIENT - SERVER
// Register , login , logout , add user by admin, change password by admin................
// dbname-prefix , firstly work with temporary prefix

export interface Iclient { //
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    gui: string | undefined; /// sfadsfsadfsadfsadfasdf
    username: string | undefined;
    logintoken: string | undefined;
    logintime: string | undefined;
    accessip: string | undefined;
    accesstime: string | undefined;
    data: Idata;
    auth: Iauth;
    owners: Array<string>;
    creator: string | undefined;
}
export class Oclient implements Iclient { // NO PREFIX -- local
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    gui: string | undefined; /// sfadsfsadfsadfsadfasdf
    username: string | undefined;
    logintoken: string | undefined;
    logintime: string | undefined;
    loginip: string | undefined;
    accessip: string | undefined;
    accesstime: string | undefined;
    data: Idata;
    auth: Iauth;
    owners: Array<string>;
    creator: string | undefined;
    constructor() {
        this.gui = Utils.now();

    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}
// data transmission only
export interface Idata { // no prefix -- local
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    username: string | undefined;
    user: Igijuser;
    message: string | undefined;
    command: string | undefined;
    // login , logout , changepassword , getuserdetails, getprofile, adduser , addprefix, add authorizedkeys....
    userprofile: Iuserprofile;
    userprefix: Iuserprefix; /// *******************************************
    encryption: Ienryptionkeys;
    system: ImySystem;
    roleslist: Irolelist;
    permissionlist: Ipermissions;
}
export class Odata implements Idata {// no prefix -- local
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    username: string | undefined; user: Igijuser;
    message: string | undefined;
    command: string | undefined;
    userprofile: Iuserprofile;
    userprefix: Iuserprefix;
    encryption: Ienryptionkeys;
    system: ImySystem;
    roleslist: Irolelist;
    permissionlist: Ipermissions;
    constructor(username: string) {
        this.username = username;

    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }

}
/// no prifix public for all
export interface Irolelist { // no prefix -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    rolename: string | undefined;
}
export class Orolelist implements Irolelist { // no prefix -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    rolename: string | undefined;
    constructor(rolename: string = '') {
        this.rolename = rolename;
    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}
///
// SERVER
export interface Iauth { // NO Prefix -- local
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    gui: string | undefined;
}
export class Oauth implements Iauth { // NO PREFIX -- local
    _id: string | undefined; _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    gui: string | undefined;
    constructor(gui: string) {
        this.gui = gui;

    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }

}

export interface ImySystem { // no prefix -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    systemname: string | undefined;
}
export class OmySystem implements ImySystem { // no prefix  -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    systemname: string | undefined;
    constructor(systemname: string = '') {
        this.systemname = systemname;

    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }

}

// ADMIN


// END ADMIN



// private dbname-prefix;
export interface IauthorizedKeys { // private -- remote
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    _id: string | undefined;
    active: boolean | undefined;
    description: string | undefined;
    authkeys: string | undefined;
    requestkey: string | undefined;
    owners: Array<string>;
    assignedto: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    encryption: Ienryptionkeys;
    userprefix: string | undefined;
    oldkeys: Array<IauthorizedKeys> | undefined;
}
export class Oauthorizedkyes implements IauthorizedKeys { // private -- remote
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    _id: string | undefined;
    active: boolean | undefined;
    description: string | undefined;
    authkeys: string | undefined;
    requestkey: string | undefined;
    owners: Array<string>;
    assignedto: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    encryption: Ienryptionkeys;
    userprefix: string | undefined;
    oldkeys: Array<IauthorizedKeys> | undefined;
}

/// FOR USER ITSELF private dbname-prefix
export interface Iuserprefix { // private -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    prefixname: string | undefined;
    prefix: string | undefined; // random private string
    serverurl: string | undefined;
    owners: Array<string>;
    authorizedkeys: Array<IauthorizedKeys>;
    members: Array<string> | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    renewlist: Array<Iuserprefix>;
}
export class Ouserprefix implements Iuserprefix { // private -- remote
    _id: string | undefined; _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    prefixname: string | undefined;
    prefix: string | undefined;
    owners: Array<string>;
    serverurl: string | undefined;
    authorizedkeys: Array<IauthorizedKeys>;
    members: Array<string> | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    renewlist: Array<Iuserprefix>;
    constructor(prefixname: string = '', prefix: string = '', owners: string | Array<string> = '') {
        this.prefixname = prefixname;
        this.prefix = prefix;
        this.owners = owners ? Array.isArray(owners) ?
        this.owners.concat(owners) : this.owners.concat([owners]) : this.owners;
        this.authorizedkeys = new Array<IauthorizedKeys>();

    }

    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }

}
// dbname
export interface Itempprefix { // private -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    ip: string | undefined;
    accesstime: string | undefined; // random private string
    serverurl: string | undefined;
    owners: Array<string>;
    email: string | undefined;
    phonenumber: string | undefined;
    activatechoice: string | undefined;
    prefix: string;
    starttime: string | undefined;
    endtime: string | undefined;
}
export class Otempprefix implements Itempprefix { // private -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    ip: string | undefined;
    accesstime: string | undefined; // random private string
    serverurl: string | undefined;
    owners: Array<string>;
    email: string | undefined;
    phonenumber: string | undefined;
    activatechoice: string | undefined;
    prefix: string;
    starttime: string | undefined;
    endtime: string | undefined;
}
// end prefix owner



export interface Igijuser { // no refix --- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    username: string | undefined;
    password: string | undefined;
    confirmpassword: string | undefined;
    phonenumber: string | undefined;
    email: string | undefined;
    gui: string | undefined;
    createddate: string;
    isactive: boolean;
    parents: Array<string>;
    roles: Array<Iroles>;
    logintoken: string | undefined;
    expirelogintoken: string | undefined;
    description: string | undefined;
    note: string | undefined;
    system: Array<ImySystem>; /// task-manager....
    gijvalue: number;
    totalgij: number;
    totalgijspent: number;
    oldphone: Array<string> | undefined;
    userprofile: Iuserprofile;
    userprefix: Array<Iuserprefix>;
    permission: Ipermissions;
    enryptionkeys: Ienryptionkeys;
    activatechoice: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
}
// // ADMIN Register , login , logout , add user by admin, change password by admin
// USER, edit USER INFO, change password by
// POUCHDB
/// prefixname-dbname-prefix
export class Ogijuser implements Igijuser {
    _id: string | undefined; _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    username: string | undefined;
    password: string | undefined;
    confirmpassword: string | undefined;
    phonenumber: string | undefined;
    email: string | undefined;
    gui: string | undefined;
    createddate: string;
    isactive: boolean;
    parents: Array<string>;
    roles: Array<Iroles>;
    logintoken: string | undefined;
    expirelogintoken: string | undefined;
    description: string | undefined;
    note: string | undefined;
    system: Array<ImySystem>;
    gijvalue: number;
    totalgij: number;
    totalgijspent: number;
    oldphone: Array<string>;
    userprofile: Iuserprofile;
    userprefix: Array<Iuserprefix>;
    permission: Ipermissions;
    enryptionkeys: Ienryptionkeys;
    activatechoice: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
    constructor(username: string = '') {
        this.username = username;

        this.gui = Utils.now();
    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }

}

export interface Iuserprofile {// private -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    owners: Array<string>;
    firstname: string | undefined;
    lastname: string | undefined;
    address: string | undefined;
    photo: Array<OphotoObj>;
    description: string | undefined;
    remark: string | undefined;
}

// dbname-prefix
export class Ouserprofile implements Iuserprofile { /// privage -- remote
    _id: string | undefined; _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    owners: Array<string>;
    firstname: string | undefined;
    lastname: string | undefined;
    address: string | undefined;
    photo: Array<OphotoObj>;
    description: string | undefined;
    remark: string | undefined;
    constructor(owner: string = '') {
        this.owners.push(owner);


    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}






/// CLIENT - SERVER  FOR owner of the application
// POUCHDB
// prefixname-dbname-prefix
export interface Iroles { // public --- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: boolean | undefined; lastupdate: string | undefined;
    rolename: string | undefined;
    groupname: string | undefined;
    owners: Array<string>; // pre-defined
    rolelevel: number;
    members: Array<string>; //
    parentroleid: string | undefined; // default

    permission: Array<Ipermissions>; // Ipermission
    oldroles: Array<Iroles>;
    assignedtime: string | undefined;
    deassignedtime: string | undefined;
    isactive: boolean;
}
export class Oroles implements Iroles { // public -- remote
    _id: string | undefined; _rev: string | undefined; isdefault: boolean | undefined; lastupdate: string | undefined;
    rolename: string | undefined;
    rolelevel: number;
    members: Array<string>;
    parentroleid: string | undefined;
    permission: Array<Ipermissions>;
    oldroles: Array<Iroles>;
    assignedtime: string | undefined;
    deassignedtime: string | undefined;
    groupname: string | undefined;
    owners: Array<string>;
    isactive: boolean;
    constructor(rolename: string = '', groupname: string = '') {
        this.rolename = rolename;
        this.groupname = groupname;
    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }

}
// prefixname-dbname-prefix
export interface Iapprovement { // public  remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    approvedby: string | undefined;
    approvedtime: string | undefined;
    createdtime: string | undefined;
    description: string | undefined;
    note: string | undefined;
    isapproved: boolean | undefined;
    isdenied: boolean | undefined;
    creator: string | undefined; // docid
    owners: Array<string>;
}
export class Oapprovement implements Iapprovement { // public  remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    approvedby: string | undefined;
    approvedtime: string | undefined;
    createdtime: string | undefined;
    description: string | undefined;
    note: string | undefined;
    isapproved: boolean | undefined;
    isdenied: boolean | undefined;
    creator: string | undefined;
    owners: Array<string>;
    constructor(approvedby: string = '') {
        this.approvedby = approvedby;
    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}

export interface Idocument { // public --- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    docname: string | undefined;
    owners: Array<string>;
    members: Array<IpermissionAssigned>;
    jobs: Array<Ijob>;
    description: string | undefined;
    createdtime: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    totalscore: number; // allow by approval only
    iscompleted: boolean;
    endreason: string | undefined;
    status: Mworkstatus;
    approvement: Array<Iapprovement>;
    // approvedby:Array<string>;
    priority: string | undefined;
    attachedfile: Array<IObj>;
    scoreslist: Array<Iscores>; // by approve only
}


export class Odocument implements Idocument { // public --- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    docname: string | undefined;
    owners: Array<string>;
    members: Array<IpermissionAssigned>;
    status: Mworkstatus;
    jobs: Array<Ijob>;
    // olddoc: Array<Idocument>;
    description: string | undefined;
    createdtime: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    totalscore: number; // allow by approval only
    iscompleted: boolean;
    endreason: string | undefined;
    // approvedby:Array<string>;
    approvement: Array<Iapprovement>;
    priority: string | undefined;
    attachedfile: Array<IObj>;
    scoreslist: Array<Iscores>; // allow by approval only
    constructor(docname: string = '', owners: string | Array<string>) {
        this.docname = docname;
        this.owners = owners ? Array.isArray(owners) ?
        this.owners.concat(owners) : this.owners.concat([owners]) : this.owners;

    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}

export interface Ijob { // public  remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    jobname: string | undefined;
    subjobs: Array<Ijob>; // allow owner to change
    description: string | undefined;
    members: Array<IpermissionAssigned>;
    createdtime: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    completedtime: string | undefined;
    approveby: Array<string>;
    score: Iscores; // ---------------allow approval users to change
    attachedfile: Array<IObj>; /// allow owner to change
    owners: Array<string>; /// allow owner to change
    creator: string | undefined; // not empty
    status: Mworkstatus; /// allow owner to change
    note: string | undefined; /// allow owner to change
}
export class Ojob implements Ijob { // public  remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    jobname: string | undefined;
    subjobs: Array<Ijob>; // create by owner only
    description: string | undefined;
    members: Array<IpermissionAssigned>;
    createdtime: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    completedtime: string | undefined; // /// allow owner to change
    approveby: Array<string>;
    score: Iscores; // allow approval users to change
    attachedfile: Array<IObj>; /// allow owner to change
    owners: Array<string>; /// allow owner to change
    creator: string | undefined; // is not allow to be empty
    status: Mworkstatus; /// allow owner to change
    note: string | undefined; /// allow owner to change
    constructor(jobname: string = '') {
        this.jobname = jobname;
    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}

export interface Iscores { // public  remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    score: number;
    status: string | undefined;
    createdtime: string | undefined;
    isold: boolean;
    owners: Array<string>;
    creator: string | undefined;
}

export class Oscores implements Iscores { // public  remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    score: number;
    status: string | undefined;
    createdtime: string | undefined;
    isold: boolean;
    owners: Array<string>;
    creator: string | undefined;
    constructor(score: number = 0) {
        this.score = score;
    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}
export interface IReport { // public  remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    createdtime: string | undefined;
    reportname: string | undefined;
    reportcont: string | undefined;
    createdby: string | undefined;
}
export class OReport implements IReport { // public  remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    createdtime: string | undefined;
    reportname: string | undefined;
    reportcont: string | undefined;
    createdby: string | undefined;
}

// export interface ImemberRequest { // public remote
//     _id: string | undefined;
//     _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
//     owners: Array<string>;
//     creator: string | undefined; // docid
//     sender: string | undefined; // sender
//     description: string | undefined;
//     requestedtime: string | undefined;
//     touser: string | undefined;
//     acceptedtime: string | undefined;
//     denytime: string | undefined;
//     reason: string | undefined;
//     endtime: string | undefined;
//     ref: string | undefined;
//     isdmin: boolean | undefined;
//     admin: string | undefined;
// }
// export class OmemberRequest implements ImemberRequest {
//     _id: string; _rev: string | undefined;
//     isdefault: string | undefined;
//     lastupdate: string | undefined;
//     owners: Array<string>;
//     creator: string; // docid
//     sender: string | undefined; // sender
//     description: string | undefined;
//     requestedtime: string;
//     touser: string;
//     acceptedtime: string;
//     denytime: string;
//     reason: string;
//     endtime: string;
//     ref: string | undefined;
//     isdmin: boolean | undefined;
//     admin: string | undefined;
// }
export interface IpermissionAssigned { // public remote
    _id: string | undefined; _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    permissionlevel: string | undefined;
    assignedname: string | undefined;
    permission: Ipermissions;
    title: string | undefined;
    admin: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
}
export class OpermissionAssigned implements IpermissionAssigned {// public  remote
    _id: string | undefined; _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    permissionlevel: string | undefined;
    assignedname: string | undefined;
    permission: Ipermissions; // dont need because we have permission id
    starttime: string | undefined;
    endtime: string | undefined;
    title: string | undefined;
    admin: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
    constructor(permissionid: string = '', assignedname: string = '', permissionlevel: string = '') {
        // this.permissionid = permissionid;
        this.assignedname = assignedname;
        this.permissionlevel = permissionlevel;
    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}
export interface Ipermissions { // public -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    permissionname: Permissionstatus | undefined;
    permissionlevel: number;
    status: string | undefined; // read or write or none
}
export class Opermissions implements Ipermissions { // public -- remote
    _id: string | undefined; _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    permissionname: string | undefined;
    permissionlevel: number;
    status: string | undefined;
    constructor(permissionname: string = '') {
        
        this.permissionname = permissionname;


    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}



export interface Itemplate { // public  remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    createdtime: string | undefined;
    templatename: string | undefined;
    content: string | undefined;
    createdby: string | undefined;
    createforuser: string | undefined;
    generatetime: string | undefined;
}
export class Otemplate implements Itemplate { // public  remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    createdtime: string | undefined;
    templatename: string | undefined;
    content: string | undefined;
    createdby: string | undefined;
    createforuser: string | undefined;
    generatetime: string | undefined;
    constructor() {

    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}
export interface Ienryptionkeys { // private -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    keys: string | undefined;
    isActive: boolean | undefined;
    startime: string | undefined;
    endtime: string | undefined;
    owners: Array<string>;
    creator: string | undefined;
}
export class Oencryptionkeys implements Ienryptionkeys { // private -- remote
    _id: string | undefined; _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    keys: string | undefined;
    owners: Array<string>;
    isActive: boolean | undefined;
    startime: string | undefined;
    endtime: string | undefined;

    creator: string | undefined;
    constructor(owner: string = '') {
        this.owners.push(owner);


    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }

}



export interface IObj { // public -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    name: string | undefined;
    arraybuffer: Blob;
    type: string | undefined;
    url: string | undefined;
}
// for attached file
export class OphotoObj implements IObj { // public -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    name: string | undefined;
    arraybuffer: Blob;
    type: string | undefined;
    url: string | undefined;
    constructor(name: string) {
        this.name = name;

    }
    processAPIResponse(response: Nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}

export class Oobj implements IObj { // public -- remote
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    name: string | undefined;
    arraybuffer: Blob;
    type: string | undefined;
    url: string | undefined;
}


































// activate via SMS
export interface IphoneObj {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    command: string | undefined;
    secret: string | undefined;
}














export interface IloginObj {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    command: string | undefined;
    client: any;
}
export interface IguiObj {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    command: string | undefined;
    gui: string | undefined;
}
export interface IonlineObj {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    command: string | undefined;
    client: {
        username: string | undefined;
        onlinetime: Date;
        system: string | undefined;
        login: Array<any>;
    };
}

export interface ItargetObj {
    _deleted: boolean;
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    gui: string | undefined;
    targetid: string | undefined;
    usergui: string | undefined;
    username: string | undefined;
    memberusername: Array<string>;
    membergui: Array<string>;
    exmember: Array<string>;
    pendingmemberapproval: Array<string>;
    deniedapprovlalist: Array<string>;
    pendinginvited: Array<string>;
    refusedinvited: Array<string>;
    blacklist: Array<string>;
    createddate: string;
    msg: Array<ImsgObj>;
}
export interface IreceivedObj {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    username: string | undefined;
    received: Date;
}
export interface IreadObj {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    username: string | undefined;
    read: Date;
}
export interface ImsgObj {
    _id: string | undefined;
    _rev: string | undefined; isdefault: string | undefined; lastupdate: string | undefined;
    gui: string | undefined;
    sender: string | undefined;
    content: string | undefined;
    msgtype: string | undefined;
    attached: Array<any>;
    sent: Date;
    received: Array<IreceivedObj>;
    read: Array<IreadObj>;
}
