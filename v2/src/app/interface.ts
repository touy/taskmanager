import { Iuser } from './pages/user-roles/modal-user-roles/modal-user-roles.component';

export class nano_time {
    static now() {
        // const nano_time = require('nano-time');
        // return nano_time.now();
        return (Date.now() * 999999.99) + "";
    }
}
export class systemlist {
    static readonly icemaker: 'icemaker';
    static readonly taskmanager: 'taskmanager';
    static readonly taskmanagerweb: 'taskmanagerweb';
    static readonly usermanager: "usermanager";
    static readonly system: "system";
    static readonly admin: "admin";
}
export class logTypes {
    static readonly info = 'info';
    static readonly warning = 'warning';
    static readonly error = 'error';
    static readonly cancel = 'cancel';
    static readonly failed = 'failed';
    static readonly success = 'success';
    static readonly ok = 'ok';
}
export class loginfo {
    _id: string | undefined;
    _rev: string | undefined;
    logtime: string | undefined;
    user: string | undefined;
    system: systemlist | undefined;
    client: Iclient | undefined;
    type: logTypes | undefined;
    message: string | undefined;
    src: string | undefined;
    constructor() {
        this.logtime = new Date().toISOString();
    }
}

// prefixname-databasename-prefix
// POS-user-sabai
// POS-user-somchay
// POS-user-somchay2
/// Database name
// NEED to work with this after register a new prefix
export interface Idbconfig {
    prefixname: string | undefined;
    dbname: string | undefined;
    prefix: string | undefined;
    serverurl: string | undefined;
    fullurl: string | undefined;
    fulldbname: string | undefined;
    username: string | undefined;
    isprivate: boolean | undefined;
    configname: string | undefined;
}
export class Odbconfig implements Idbconfig {
    prefixname: string | undefined;;
    dbname: string | undefined;;
    prefix: string | undefined;;
    fulldbname: string | undefined;
    username: string | undefined;
    serverurl: string | undefined;
    fullurl: string | undefined;
    isprivate: boolean | undefined;
    configname: string | undefined;
}
export class Xdbconfig extends Odbconfig {
    constructor(configname: string, params?: { prefixname: string, dbname: string, prefix: string, username: string, serverurl: string | undefined }) {
        super();
        this.prefixname = params.prefixname;
        this.dbname = params.dbname;
        this.prefix = params.prefix;
        this.username = params.username;
        this.serverurl = params.serverurl;
        this.configname = configname;
    }
    setconfigname(name) {
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
export interface I_security_user {
    names: string[];
    roles: string[];
}
export class O_security_user implements I_security_user {
    names: string[];
    roles: string[];
}
export class X_security_user extends O_security_user {
    constructor(names: string | Array<string>, roles: string | Array<string>) {
        super();
        this.addName(names);
        this.addRole(roles);
    }
    addName(x: string | Array<string>) {
        return x ? Array.isArray(x) ? x.map(y => this.names.push(y)) : this.names.push(x) : this.names;
    }
    addRole(x: string | Array<string>) {
        return x ? Array.isArray(x) ? x.map(y => this.roles.push(y)) : this.roles.push(x) : this.roles;
    }
    removeName(x: string) {
        return this.names = this.names.filter(n => n != x);
    }
    removeRole(x: string) {
        return this.roles = this.roles.filter(n => n != x);
    }
    clearNames() {
        return this.names.length = 0;
    }
    clearRoles() {
        return this.roles.length = 0;
    }
    reset() {
        return this.roles.length = 0;
        return this.names.length = 0;
    }
}

export interface I_security {
    admins: Array<I_security_user>;
    members: Array<I_security_user>;
}
export class O_security implements I_security {
    admins: Array<I_security_user>;
    members: Array<I_security_user>;
}
export class X_security extends O_security {
    constructor() {
        super();
    }
    /// TEST ONLY THEN REMOVE THIS BELOW LATER
    getJson() {
        return this as I_security;
    }


}
// console.log(new O_security());
// console.log(new X_security());
// console.log(new X_security().getJson());

export class I_user {
    _id: string | undefined;
    metadata:{
        dbconfig:Array<Idbconfig> | undefined,
        data:Array<any>
    }; 
    name: string | undefined; 
    password: string | undefined; 
    roles: string[] | undefined; 
    type: string | undefined;

}
export class O_user implements I_user {
    _id: string | undefined;
    _rev: string | undefined;
    metadata:{
        dbconfig:Array<Idbconfig> | undefined,
        data:Array<any>
    };
    name: string;
    password: string;
    roles: string[];
    type: string;
}
export class X_user extends O_user {
    _id: string | undefined;
    _rev: string | undefined;
    dbconfig: Array<Idbconfig>;
    name: string;
    password: string;
    roles: string[];
    type: string;
    constructor(name?: string, password?: string, roles?: string[] | string, dbconfig?: Array<Idbconfig> | Idbconfig) {
        super();
        this.type = 'user';
        this.name = name;
        this.password = password;
        this._id = `org.couchdb.user:${name}`;
        roles ? Array.isArray(roles) ? roles.map(x => this.roles.push(x)) : this.roles.push(roles) : this.roles;
        dbconfig ? Array.isArray(dbconfig) ? dbconfig.map(x => this.dbconfig.push(x)) : this.dbconfig.push(dbconfig) : this.dbconfig;
    }
    setAdmin() {
        this.type = 'admin';/// FOR SYSTEM ADMIN ONLY
    }
}
export class Osettingvaluenames {
    auto: 'auto';
    disable: 'disable';
    enable: 'enable';
}

export class Osettingobj {
    _id: string | undefined;
    _rev: string | undefined;
    name: Osettingvaluenames | undefined;
    value: string | undefined;
    type: string | undefined;
    description: string | undefined;
    force: boolean;
}

export class Osetting {
    _id: string | undefined;
    _rev: string | undefined;
    dblink: string | undefined;
    settings: Array<Osettingobj>;
}
export class personalsetting extends Osetting {
    dblink: string | undefined;
    constructor() {
        super();
    }
}
export interface Imsggroup {
    _id: string | undefined;
    _rev: string | undefined;
    members: Array<I_user>;
    admin: Array<I_user>;
    oldadmin: Array<I_user>;
    deletedmember: Array<I_user>;
    banmembers: Array<I_user>;
    msgcomlink: string | undefined;
    msggroupname: string | undefined;
}
export class Omsggroup implements Imsggroup {
    _id: string; _rev: string;
    members: Array<I_user>;
    admin: Array<I_user>;
    oldadmin: Array<I_user>;
    deletedmember: Array<I_user>;
    banmembers: Array<I_user>;
    creator: Iuser;
    defaultadmin: Array<I_user>;
    msgcomlink: string;
    msggroupname: string;
}
export class Imsgactioname {
    typing: 'typing';
    audio: 'audio';
    vdo: 'vdo';
}
export class msgaction {
    username: string | undefined;
    action: Imsgactioname;
}
export interface Imsgcom {
    _id: string | undefined;
    _rev: string | undefined;
    sender: string | undefined;
    receiver: string | undefined;
    senttime: string | undefined;
    receivedtime: string | undefined;
    status: string | undefined;
    attachedfile: Array<IObj> | undefined;
    attachedfilesize: string | undefined;
    attachedfilename: string | undefined;
    action: Array<msgaction> | undefined;
}
export class MyDataBaseNames {
    static readonly dbuser: string = 'g-users-';
    static readonly dbprofile: string = 'g-profile-';
    static readonly dbjob: string = 'g-job-';
    static readonly dbdoc: string = 'g-doc-';
    static readonly dbmember: string = 'g-member-';
    static readonly dbpermission: string = 'g-permission-';
    static readonly dbrole: string = 'g-role-';
    static readonly dbrolelist: string = 'g-role-list-';
    static readonly dbuserrole: string = 'g-user-role-';
    static readonly dbuserpermission: string = 'g-user-permision-';
    static readonly dbuserpermissionassigned: string = 'g-user-permission-assigned-';
    static readonly dbclient: string = 'g-system-client-';
    static readonly dbsystemuser = '_users';

    static readonly dbpersonalno: string = 'g-personal-notification-';
    static readonly dbglobalno: string = 'g-global-notification-';
    static readonly dbpersonallogging: string = 'g-personal-loggin-';
    static readonly dbgloballlogging: string = 'g-global-loggin-';
    static readonly dbsmsno: string = 'g-sms-notification-';
    static readonly dbemailno: string = 'g-email-notification-';
    static readonly dbmsg: string = 'g-dbmsg-';
    // BY DEFAULT FOR DEVELOPMENT PURPOSE ONLY
    static readonly remoteCouch: string = 'http://admin:admin@localhost:5984/';
}
export class globalcommands {
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
}
/// prefixname-dbname-prefix
// prefix : 1. private ==> userprofile-12345 , user-12345
// prefix : 2. group ==> user-g12345 , userprofile-g12345


// CLIENT - SERVER
// Register , login , logout , add user by admin, change password by admin................
export interface Iclient { // NO PREFIX -- local
    _id: string | undefined;
    _rev: string | undefined;
    gui: string | undefined; /// sfadsfsadfsadfsadfasdf
    username: string | undefined;
    logintoken: string | undefined;
    logintime: string | undefined;
    loginip: string | undefined;
    data: Idata;
    auth: Iauth;
}
export class Oclient implements Iclient { // NO PREFIX -- local
    _id: string | undefined;
    _rev: string | undefined;
    gui: string | undefined; /// sfadsfsadfsadfsadfasdf
    username: string | undefined;
    logintoken: string | undefined;
    logintime: string | undefined;
    loginip: string | undefined;
    data: Idata;
    auth: Iauth;
    constructor() {
        this.gui = nano_time.now();
        this._id = nano_time.now();
    }
}
export interface I_user {

}
//CLIENT -SERVER
export interface Idata { // no prefix -- local
    _id: string | undefined;
    _rev: string | undefined;
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
    _rev: string | undefined;
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
        this._id = nano_time.now();
    }

}
/// ADMIN
export interface Irolelist { // no prefix -- remote
    _id: string | undefined;
    _rev: string | undefined;
    rolename: string | undefined;
}
export class Orolelist implements Irolelist { // no prefix -- remote
    _id: string | undefined;
    _rev: string | undefined;
    rolename: string | undefined;
    constructor(rolename: string = '') {
        this.rolename = rolename;
    }
}
///
// SERVER
export interface Iauth { // NO Prefix -- local
    _id: string | undefined;
    _rev: string | undefined;
    gui: string | undefined;
}
export class Oauth implements Iauth { // NO PREFIX -- local
    _id: string | undefined; _rev: string | undefined;
    gui: string | undefined;
    constructor(gui: string) {
        this.gui = gui;
        this._id = nano_time.now();
    }

}

export interface ImySystem { // no prefix -- remote
    _id: string | undefined;
    _rev: string | undefined;
    systemname: string | undefined;
}
export class OmySystem implements ImySystem { // no prefix  -- remote
    _id: string | undefined;
    _rev: string | undefined;
    systemname: string | undefined;
    constructor(systemname: string = '') {
        this.systemname = systemname;
        this._id = nano_time.now();
    }

}

// ADMIN 


// END ADMIN 



// INTERNAL ONLY
export interface IauthorizedKeys { // private -- remote
    _rev: string | undefined;
    _id: string | undefined;
    active: boolean | undefined;
    description: string | undefined;
    authkeys: string | undefined;
    requestkey: string | undefined;
    owner: string | undefined;
    assignedto: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    encryption: Ienryptionkeys;
    userprefix: string | undefined;
    oldkeys: Array<IauthorizedKeys> | undefined;
}
export class Oauthorizedkyes implements IauthorizedKeys { // private -- remote
    _rev: string | undefined;
    _id: string | undefined;
    active: boolean | undefined;
    description: string | undefined;
    authkeys: string | undefined;
    requestkey: string | undefined;
    owner: string | undefined;
    assignedto: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    encryption: Ienryptionkeys;
    userprefix: string | undefined;
    oldkeys: Array<IauthorizedKeys> | undefined;
}

/// FOR USER ITSELF PUBLIC
export class Ouserprefix implements Iuserprefix { // private -- remote
    _id: string | undefined; _rev: string | undefined;
    prefixname: string | undefined;
    prefix: string | undefined;
    owner: string | undefined;
    serverurl: string | undefined;
    authorizedkeys: Array<IauthorizedKeys>;
    members: Array<string> | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    renewlist: Array<Iuserprefix>;
    constructor(prefixname: string = '', prefix: string = '', owner: string = '') {
        this.prefixname = prefixname;
        this.prefix = prefix;
        this.owner = owner;
        this.authorizedkeys = new Array<IauthorizedKeys>();
        this._id = nano_time.now();
    }

}
export interface Iuserprefix { // private -- remote
    _id: string | undefined;
    _rev: string | undefined;
    prefixname: string | undefined;
    prefix: string | undefined; // random private string
    serverurl: string | undefined;
    owner: string | undefined;
    authorizedkeys: Array<IauthorizedKeys>;
    members: Array<string> | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    renewlist: Array<Iuserprefix>;
}

// end prefix owner

// // ADMIN Register , login , logout , add user by admin, change password by admin
// USER, edit USER INFO, change password by 
// POUCHDB
/// prefixname-dbname-prefix
export class Ogijuser implements Igijuser {
    _id: string | undefined; _rev: string | undefined;
    username: string | undefined;
    password: string | undefined;
    confirmpassword: string | undefined;
    phonenumber: string | undefined;
    email: string | undefined;
    gui: string | undefined;
    createddate: Date;
    lastupdate: Date;
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
    constructor(username: string = '') {
        this.username = username;
        this._id = nano_time.now();
        this.gui = nano_time.now();
    }

}
export interface Igijuser { // no refix --- remote
    _id: string | undefined;
    _rev: string | undefined;
    username: string | undefined;
    password: string | undefined;
    confirmpassword: string | undefined;
    phonenumber: string | undefined;
    email: string | undefined;
    gui: string | undefined;
    createddate: Date;
    lastupdate: Date;
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
}
export class Ouserprofile implements Iuserprofile { /// privage -- remote
    _id: string | undefined; _rev: string | undefined;
    owner: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    address: string | undefined;
    photo: Array<OphotoObj>;
    description: string | undefined;
    remark: string | undefined;
    constructor(owner: string = '') {
        this.owner = owner;
        this._id = nano_time.now();

    }
}
export interface Iuserprofile {// private -- remote
    _id: string | undefined;
    _rev: string | undefined;
    owner: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    address: string | undefined;
    photo: Array<OphotoObj>;
    description: string | undefined;
    remark: string | undefined;
}





/// CLIENT - SERVER  FOR owner of the application
// POUCHDB
// owner
export interface Iroles { // public --- remote
    _id: string | undefined;
    _rev: string | undefined;
    rolename: string | undefined;
    groupname: string | undefined;
    owner: string | undefined; // pre-defined
    rolelevel: number;
    members: Array<string>; // 
    parentroleid: string | undefined;//default
    isdefault: boolean;
    permission: Array<Ipermissions>; // Ipermission  Ipermissionassigned Ipermissionrequest
    oldroles: Array<Iroles>;
    assignedtime: string | undefined;
    deassignedtime: string | undefined;
    isactive: boolean;
}
export class Oroles implements Iroles { // public -- remote
    _id: string | undefined; _rev: string | undefined;
    rolename: string | undefined;
    rolelevel: number;
    members: Array<string>;
    parentroleid: string | undefined;
    isdefault: boolean;
    permission: Array<Ipermissions>;
    oldroles: Array<Iroles>;
    assignedtime: string | undefined;
    deassignedtime: string | undefined;
    groupname: string | undefined;
    owner: string | undefined;
    isactive: boolean;
    constructor(rolename: string = '', groupname: string = '') {
        this.rolename = rolename;
        this._id = nano_time.now();

    }

}



export interface Iapprovement { // public  remote
    _id: string | undefined;
    _rev: string | undefined;
    approvedby: string | undefined;
    approvedtime: string | undefined;
}
export class Oapprovement implements Iapprovement { // public  remote
    _id: string | undefined;
    _rev: string | undefined;
    approvedby: string | undefined;
    approvedtime: string | undefined;
    constructor(approvedby: string = '') {
        this.approvedby = approvedby;

        this._id = nano_time.now();


    }
}
export class Odocument implements Idocument { // public --- remote
    _id: string | undefined;
    _rev: string | undefined;
    docname: string | undefined;
    owner: string | undefined;
    members: Array<IpermissionAssigned>;
    jobs: Array<Ijob>;
    description: string | undefined;
    createdtime: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    totalscore: number;
    iscompleted: boolean;
    endreason: string | undefined;
    status: string | undefined;
    referees: Array<string>;
    approved: Iapprovement;
    priority: string | undefined;
    attachedfile: Array<IObj>;
    scoreslist: Array<Iscores>;
    attachefile: IObj;
    constructor(docname: string = '', owner: string = '') {
        this._id = nano_time.now();
        this.docname = docname;
        this.owner = owner;

    }
}
export interface Idocument { // public --- remote
    _id: string | undefined;
    _rev: string | undefined;
    docname: string | undefined;
    owner: string | undefined;
    members: Array<IpermissionAssigned>;
    jobs: Array<Ijob>;
    description: string | undefined;
    createdtime: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    totalscore: number;
    iscompleted: boolean;
    endreason: string | undefined;
    status: string | undefined;
    referees: Array<string>;
    approved: Iapprovement;
    priority: string | undefined;
    attachedfile: Array<IObj>;
    scoreslist: Array<Iscores>;
    attachefile: IObj;
}
export interface Ijob { // public  remote
    _id: string | undefined;
    _rev: string | undefined;
    docid: string | undefined;
    jobname: string | undefined;
    subdoc: Array<Idocument>;
    description: string | undefined;
    members: Array<IpermissionAssigned>;
    createdtime: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    score: Iscores;
    attachefile: IObj;
}
export class Ojob implements Ijob { // public  remote
    _id: string | undefined;
    _rev: string | undefined;
    jobname: string | undefined;
    docid: string | undefined;
    subdoc: Array<Idocument>;
    description: string | undefined;
    members: Array<IpermissionAssigned>;
    createdtime: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    score: Iscores;
    attachefile: IObj;
    constructor(jobname: string = '') {

        this._id = nano_time.now();

    }
}
export class Oscores implements Iscores { // public  remote
    _id: string | undefined;
    _rev: string | undefined;
    score: number;
    referee: string | undefined;
    status: string | undefined;
    createdtime: string | undefined;
    isold: boolean;
    constructor(score: number = 0) {
        this.score = score;

        this._id = nano_time.now();

    }
}
export interface Iscores { // public  remote
    _id: string | undefined;
    _rev: string | undefined;
    score: number;
    referee: string | undefined;
    status: string | undefined;
    createdtime: string | undefined;
    isold: boolean;
}
export class OReport implements IReport { // public  remote
    _id: string | undefined;
    _rev: string | undefined;
    createdtime: string | undefined;
    reportname: string | undefined;
    reportcont: string | undefined;
    createdby: string | undefined;
}
export interface IReport { // public  remote
    _id: string | undefined;
    _rev: string | undefined;
    createdtime: string | undefined;
    reportname: string | undefined;
    reportcont: string | undefined;
    createdby: string | undefined;
}
export interface ImemberRequest { // public remote
    _id: string | undefined;
    _rev: string | undefined;
    owner: string | undefined;
    requestedtime: string | undefined;
    touser: string | undefined;
    acceptedtime: string | undefined;
    denytime: string | undefined;
    reason: string | undefined;
    endtime: string | undefined;
    ref: string | undefined;
}
export class OmemberRequest implements ImemberRequest {
    _id: string; _rev: string;
    owner: string;
    requestedtime: string;
    touser: string;
    acceptedtime: string;
    denytime: string;
    reason: string;
    endtime: string;
    ref: string | undefined;
}
export interface IpermissionAssigned { // public remote
    _id: string | undefined; _rev: string | undefined;
    permissionid: string | undefined;
    permissionlevel: string | undefined;
    assignedname: string | undefined;
    title: string | undefined;
    admin: string | undefined;
    memberaccepted: Array<ImemberRequest>;
    starttime: string | undefined;
    endtime: string | undefined;
}
export class OpermissionsAssigned implements IpermissionAssigned {// public  remote
    _id: string | undefined; _rev: string | undefined;
    permissionid: string | undefined;
    permissionlevel: string | undefined;
    assignedname: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    title: string | undefined;
    admin: string | undefined;
    memberaccepted: Array<ImemberRequest>;
    constructor(permissionid: string = '', assignedname: string = '', permissionlevel: string = '') {
        this.permissionid = permissionid;
        this.assignedname = assignedname;
        this.permissionlevel = permissionlevel;
        this._id = nano_time.now();
    }
}
export class Opermissions implements Ipermissions { // public -- remote
    _id: string | undefined; _rev: string | undefined;
    permissionname: string | undefined;
    permissionlevel: number;
    status: string | undefined;
    constructor(permissionname: string = '') {
        this.permissionname = permissionname;
        this._id = nano_time.now();

    }
}




export interface Ipermissions { // public -- remote
    _id: string | undefined;
    _rev: string | undefined;
    permissionname: string | undefined;
    permissionlevel: number;
    status: string | undefined; // read or write
}
export class Ouserpermissions implements Ipermissions { // no prefix -- remote
    _id: string | undefined;
    _rev: string | undefined;
    permissionname: string | undefined;
    permissionlevel: number;
    status: string | undefined; // read or write
}
export interface Itemplate { // public  remote
    _id: string | undefined;
    _rev: string | undefined;
    createdtime: string | undefined;
    templatename: string | undefined;
    content: string | undefined;
    createdby: string | undefined;
    createforuser: string | undefined;
    generatetime: string | undefined
}
export class Otemplate implements Itemplate { // public  remote
    _id: string | undefined;
    _rev: string | undefined;
    createdtime: string | undefined;
    templatename: string | undefined;
    content: string | undefined;
    createdby: string | undefined;
    createforuser: string | undefined;
    generatetime: string | undefined;
    constructor() {

    }
}

export class Oencryptionkeys implements Ienryptionkeys { // private -- remote
    _id: string | undefined; _rev: string | undefined;
    keys: string | undefined;
    owner: string | undefined;
    isActive: string | undefined;
    startime: string | undefined;
    endtime: string | undefined;
    constructor(owner: string = '') {
        this.owner = owner;
        this._id = nano_time.now();

    }

}
export interface Ienryptionkeys { // private -- remote
    _id: string | undefined;
    _rev: string | undefined;
    keys: string | undefined;
    owner: string | undefined;
    isActive: string | undefined;
    startime: string | undefined;
    endtime: string | undefined;
}



// for attached file
export class OphotoObj implements IObj { // public -- remote
    name: string | undefined;
    arraybuffer: Blob;
    type: string | undefined;
    url: string | undefined;
    _id: string | undefined; _rev: string | undefined;
    constructor(name: string) {
        this.name = name;
        this._id = nano_time.now();
    }
}
export class Oobj implements IObj { // public -- remote
    _id: string | undefined;
    _rev: string | undefined;
    name: string | undefined;
    arraybuffer: Blob;
    type: string | undefined;
    url: string | undefined;
}
export interface IObj { // public -- remote
    _id: string | undefined;
    _rev: string | undefined;
    name: string | undefined;
    arraybuffer: Blob;
    type: string | undefined;
    url: string | undefined;
}

































// activate via SMS
export interface IphoneObj {
    _id: string | undefined;
    _rev: string | undefined;
    command: string | undefined;
    secret: string | undefined;
}














export interface IloginObj {
    _id: string | undefined;
    _rev: string | undefined;
    command: string | undefined;
    client: any;
}
export interface IguiObj {
    _id: string | undefined;
    _rev: string | undefined;
    command: string | undefined;
    gui: string | undefined;
}
export interface IonlineObj {
    _id: string | undefined;
    _rev: string | undefined;
    command: string | undefined;
    client: {
        username: string | undefined;
        onlinetime: Date;
        system: string | undefined;
        login: Array<any>;
    };
}

export interface ItargetObj {
    '_deleted': boolean;
    '_id': string | undefined;
    '_rev': string | undefined;
    'gui': string | undefined;
    'targetid': string | undefined;
    'usergui': string | undefined;
    'username': string | undefined;
    'memberusername': Array<string>;
    'membergui': Array<string>;
    'exmember': Array<string>;
    'pendingmemberapproval': Array<string>;
    'deniedapprovlalist': Array<string>;
    'pendinginvited': Array<string>;
    'refusedinvited': Array<string>;
    'blacklist': Array<string>;
    'createddate': Date;
    'msg': Array<ImsgObj>;
}
export interface IreceivedObj {
    _id: string | undefined;
    _rev: string | undefined;
    username: string | undefined;
    received: Date;
}
export interface IreadObj {
    _id: string | undefined;
    _rev: string | undefined;
    username: string | undefined;
    read: Date;
}
export interface ImsgObj {
    _id: string | undefined;
    _rev: string | undefined;
    gui: string | undefined;
    sender: string | undefined;
    content: string | undefined;
    msgtype: string | undefined;
    attached: Array<any>;
    sent: Date;
    received: Array<IreceivedObj>;
    read: Array<IreadObj>;
}