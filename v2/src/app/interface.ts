

export class nano_time {
    static now(){
       // const nano_time = require('nano-time');
        // return nano_time.now();
        return (Date.now()*1000000)+"";
    }
}
// export const nano_time = (unit) => {

//     const hrTime = process.hrtime();

//     switch (unit) {

//         case 'milli':
//             return hrTime[0] * 1000 + hrTime[1] / 1000000;

//         case 'micro':
//             return hrTime[0] * 1000000 + hrTime[1] / 1000;

//         case 'nano':
//             return hrTime[0] * 1000000000 + hrTime[1];

//         default:
//             return nano_time.now();
//     }

// };
/// Database name
export class MyDataBaseNames {
    static dbuser: string = 'g-users-';
    static dbprofile: string = 'g-profile-';
    static dbjob: string = 'g-job-';
    static dbdoc: string = 'g-doc-';
    static dbmember: string = 'g-member-';
    static dbpermission: string = 'g-permission-';
    static dbrole: string = 'g-role-';
}
/// dbname-prefix
// prefix : 1. private ==> userprofile-12345 , user-12345
// prefix : 2. group ==> user-g12345 , userprofile-g12345


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
    public constructor() {
        this.gui = nano_time.now();
        this._id = nano_time.now();
    }
}


export interface Iauth { // NO Prefix -- local
    _id: string | undefined;
    _rev: string | undefined;
    gui: string | undefined;
}

export class Oauth implements Iauth { // NO PREFIX -- local
    _id: string | undefined; _rev: string | undefined;
    gui: string | undefined;
    public constructor(gui: string) {
        this.gui = gui;
        this._id=nano_time.now();
    }

}


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
    public constructor(username: string) {
        this.username = username;
        this._id=nano_time.now();        
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
    public constructor(systemname: string = '') {
        this.systemname = systemname;
        this._id=nano_time.now();        
    }

}

export class Ogijuser implements Igijuser{
    _id: string | undefined;    _rev: string | undefined;
    username: string | undefined;
    password: string | undefined;
    confirmpassword: string | undefined;
    phonenumber: string | undefined;
    gui: string | undefined;
    createddate: Date;
    lastupdate: Date;
    isactive: boolean;
    parents: string[];
    roles: Iroles[];
    logintoken: string | undefined;
    expirelogintoken: string | undefined;
    description: string | undefined;
    note: string | undefined;
    system: ImySystem[];
    gijvalue: number;
    totalgij: number;
    totalgijspent: number;
    oldphone: string[];
    userprofile: Iuserprofile;
    userprefix: Iuserprefix;
    permission: Ipermissions;
    enryptionkeys: Ienryptionkeys;
    public constructor(username:string = ''){
        this.username=username;
        this._id=nano_time.now();
        this.gui=nano_time.now();        
    }

}

export interface Igijuser { // no refix --- remote
    _id: string | undefined;
    _rev: string | undefined;
    username: string | undefined;
    password: string | undefined;
    confirmpassword: string | undefined;
    phonenumber: string | undefined;
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
    system: Array<ImySystem>; /// ice-maker, gij, stock-manager....
    gijvalue: number;
    totalgij: number;
    totalgijspent: number;
    oldphone: Array<string> | undefined;
    userprofile: Iuserprofile;
    userprefix: Iuserprefix;
    permission: Ipermissions;
    enryptionkeys: Ienryptionkeys;
}

export class Ouserprofile implements Iuserprofile { /// privage -- remote
    _id: string | undefined; _rev: string | undefined;
    owner: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    address: string | undefined;
    photo: Array<IObj>;
    description: string | undefined;
    remark: string | undefined;
    public constructor(owner: string = '') {
        this.owner = owner;
        this._id=nano_time.now();
        
    }
}

export interface Iuserprofile {// private -- remote
    _id: string | undefined;
    _rev: string | undefined;
    owner: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    address: string | undefined;
    photo: Array<IObj>;
    description: string | undefined;
    remark: string | undefined;
}
export interface Irolelist { // public -- remote
    _id: string | undefined;
    _rev: string | undefined;
    rolename: string | undefined;
}
export interface IauthrorizedKeys { // private -- remote
    _rev: string | undefined;
    _id: string | undefined;
    description: string | undefined;
    authkeys: string | undefined;
    owner: string | undefined;
    assignedto: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    encryption: Ienryptionkeys;
}

export interface Iuserprefixauthorizedkeys { // private -- remote
    _id: string | undefined;
    _rev: string | undefined;
    userprefixid: string | undefined;
    authkeysid: string | undefined;
    authkeys: string | undefined;
    owner: string | undefined;
    assignedto: string | undefined;
}
export class Ouserprefix implements Iuserprefix { // private -- remote
    _id: string | undefined; _rev: string | undefined;
    prefixname: string | undefined;
    prefix: string | undefined;
    owner: string | undefined;
    serverurl:string;
    authorizedkeys: Array<IauthrorizedKeys>;
    assignedto: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    renewlist: Array<Iuserprefix>;
    public constructor(prefixname: string = '', prefix: string = '', owner: string = '', assignedto: string = '') {
        this.prefixname = prefixname;
        this.prefix = prefix;
        this.owner = owner;
        this.authorizedkeys = new Array<IauthrorizedKeys>();
        this.assignedto = assignedto;
        this._id=nano_time.now();        
    }

}
export interface Iuserprefix { // private -- remote
    _id: string | undefined;
    _rev: string | undefined;
    prefixname: string | undefined;
    prefix: string | undefined;
    serverurl:string;
    owner: string | undefined;
    authorizedkeys: Array<IauthrorizedKeys>;
    assignedto: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    renewlist: Array<Iuserprefix>;
}
export interface ImemberRequest {
    _id: string | undefined;
    _rev: string | undefined;
    owner: string | undefined;
    requestedtime: string | undefined;
    touser: string | undefined;
    acceptedtime: string | undefined;
    denytime: string | undefined;
    reason: string | undefined;
    endtime: string | undefined;
}
export interface IpermissionAssigned {
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
export class OpermissionsAssigned implements IpermissionAssigned {
    _id: string | undefined; _rev: string | undefined;
    permissionid: string | undefined;
    permissionlevel: string | undefined;
    assignedname: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    title: string | undefined;
    admin: string | undefined;
    memberaccepted: Array<ImemberRequest>;
    public constructor(permissionid: string = '', assignedname: string = '', permissionlevel: string = '') {
        this.permissionid = permissionid;
        this.assignedname = assignedname;
        this.permissionlevel = permissionlevel;
        this._id=nano_time.now();        
    }
}
export class Opermissions implements Ipermissions { // public -- remote
    _id: string | undefined; _rev: string | undefined;
    permissionname: string | undefined;
    permissionlevel: number;
    public constructor(permissionname: string = '') {
        this.permissionname = permissionname;
        this._id=nano_time.now();
        
    }
}
export interface Ipermissions { // public -- remote
    _id: string | undefined;
    _rev: string | undefined;
    permissionname: string | undefined;
    permissionlevel: number;
}
export class Oencryptionkeys implements Ienryptionkeys { // private -- remote
    _id: string | undefined; _rev: string | undefined;
    keys: string | undefined;
    owner: string | undefined;
    isActive: string | undefined;
    startime: string | undefined;
    endtime: string | undefined;
    public constructor(owner: string = '') {
        this.owner = owner;
        this._id=nano_time.now();
        
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
export interface Iroles { // public --- remote
    _id: string | undefined;
    _rev: string | undefined;
    rolename: string | undefined;
    groupname: string | undefined;
    rolelevel: number;
    parentroleid: string | undefined;
    isdefault: boolean;
    permission: Array<Ipermissions>;
    oldroles: Array<Iroles>;
    assignedtime: string | undefined;
    deassignedtime: string | undefined;
}
export class Oroles implements Iroles { // public -- remote
    _id: string | undefined; _rev: string | undefined;
    rolename: string | undefined;
    rolelevel: number;
    parentroleid: string | undefined;
    isdefault: boolean;
    permission: Array<Ipermissions>;
    oldroles: Array<Iroles>;
    assignedtime: string | undefined;
    deassignedtime: string | undefined;
    groupname: string | undefined;
    public constructor(rolename: string = '', groupname: string = '') {
        this.rolename = rolename;
        this._id=nano_time.now();
        
    }

}
export interface Iapprovement {
    _id: string | undefined;
    _rev: string | undefined;
    approvedby: string | undefined;
    approvedtime: string | undefined;
}
export class Oapprovement implements Iapprovement {
    _id: string | undefined;
    _rev: string | undefined;
    approvedby: string | undefined;
    approvedtime: string | undefined;
    public constructor(approvedby: string = '') {
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
    public constructor(docname: string = '', owner: string = '') {
        this._id=nano_time.now();
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
}
export interface Ijob {
    _id: string | undefined;
    _rev: string | undefined;
    jobname: string | undefined;
    description: string | undefined;
    members: Array<IpermissionAssigned>;
    createdtime: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    score: Iscores;
}
export class Ojob implements Ijob {
    _id: string | undefined;
    _rev: string | undefined;
    jobname: string | undefined;
    description: string | undefined;
    members: Array<IpermissionAssigned>;
    createdtime: string | undefined;
    starttime: string | undefined;
    endtime: string | undefined;
    score: Iscores;
    public constructor(jobname: string = '') {

        this._id = nano_time.now();
        
    }
}

export class Oscores implements Iscores {
    _id: string | undefined;
    _rev: string | undefined;
    score: number;
    referee: string | undefined;
    status: string | undefined;
    createdtime: string | undefined;
    isold: boolean;
    public constructor(score: number = 0) {
        this.score = score;

        this._id = nano_time.now();
        
    }
}
export interface Iscores {
    _id: string | undefined;
    _rev: string | undefined;
    score: number;
    referee: string | undefined;
    status: string | undefined;
    createdtime: string | undefined;
    isold: boolean;
}
export class OReport implements IReport {
    _id: string | undefined;
    _rev: string | undefined;
    createdtime: string | undefined;
    reportname: string | undefined;
    reportcont: string | undefined;
    createdby: string | undefined;
}


export interface IReport {
    _id: string | undefined;
    _rev: string | undefined;
    createdtime: string | undefined;
    reportname: string | undefined;
    reportcont: string | undefined;
    createdby: string | undefined;
}


export class Oconfig implements Iconfig{
    _rev: string | undefined;    _id: string | undefined;
    configname: string | undefined;
    value: string | undefined;
    key: string | undefined;
    createdtime: string | undefined;
    oldconfig: Iconfig[];
    public constructor(configname:string = ''){
        this.configname=configname;
    }
}
export interface Iconfig{
    _rev:string;
    _id:string;
    configname:string;
    value:string;
    key:string;
    createdtime:string;
    oldconfig:Array<Iconfig>;
}












export class OphotoObj implements IObj { // public -- remote
    name: string | undefined;
    arraybuffer: Blob;
    type: string | undefined;
    url: string | undefined;
    _id: string | undefined; _rev: string | undefined;
    public constructor(name: string) {
        this.name = name;
        this._id=nano_time.now();   
    }
}

interface IObj { // public -- remote
    _id: string | undefined;
    _rev: string | undefined;
    name: string | undefined;
    arraybuffer: Blob;
    type: string | undefined;
    url: string | undefined;
}


































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