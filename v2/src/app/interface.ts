

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
}
/// dbname-prefix
// prefix : 1. private ==> userprofile-12345 , user-12345
// prefix : 2. group ==> user-g12345 , userprofile-g12345


export interface Iclient { // NO PREFIX -- local
    _id: string;
    _rev: string;
    gui: string; /// sfadsfsadfsadfsadfasdf
    username: string;
    logintoken: string;
    logintime: string;
    loginip: string;
    data: Idata;
    auth: Iauth;
}

export class Oclient implements Iclient { // NO PREFIX -- local
    _id: string;
    _rev: string;
    gui: string; /// sfadsfsadfsadfsadfasdf
    username: string;
    logintoken: string;
    logintime: string;
    loginip: string;
    data: Idata;
    auth: Iauth;
    constructor() {
        this.gui = nano_time.now();
        this._id = nano_time.now();
    }
}


export interface Iauth { // NO Prefix -- local
    _id: string;
    _rev: string;
    gui: string;
}

export class Oauth implements Iauth { // NO PREFIX -- local
    _id: string; _rev: string;
    gui: string;
    constructor(gui: string) {
        this.gui = gui;
        this._id=nano_time.now();
    }

}


export interface Idata { // no prefix -- local
    _id: string;
    _rev: string;
    username: string;
    user: Igijuser;
    message: string;
    command: string;
    // login , logout , changepassword , getuserdetails, getprofile, adduser , addprefix, add authorizedkeys....
    userprofile: Iuserprofile;
    userprefix: Iuserprefix; /// *******************************************
    encryption: Ienryptionkeys;
    system: ImySystem;
    roleslist: Irolelist;
    permissionlist: Ipermissions;
}
export class Odata implements Idata {// no prefix -- local
    _id: string;
    _rev: string;
    username: string; user: Igijuser;
    message: string;
    command: string;
    userprofile: Iuserprofile;
    userprefix: Iuserprefix;
    encryption: Ienryptionkeys;
    system: ImySystem;
    roleslist: Irolelist;
    permissionlist: Ipermissions;
    constructor(username: string) {
        this.username = username;
        this._id=nano_time.now();        
    }

}



export interface ImySystem { // no prefix -- remote
    _id: string;
    _rev: string;
    systemname: string;
}
export class OmySystem implements ImySystem { // no prefix  -- remote
    _id: string;
    _rev: string;
    systemname: string;
    constructor(systemname: string = '') {
        this.systemname = systemname;
        this._id=nano_time.now();        
    }

}

export class Ogijuser implements Igijuser{
    _id: string;    _rev: string;
    username: string;
    password: string;
    confirmpassword: string;
    phonenumber: string;
    gui: string;
    createddate: Date;
    lastupdate: Date;
    isactive: boolean;
    parents: string[];
    roles: Iroles[];
    logintoken: string;
    expirelogintoken: string;
    description: string;
    note: string;
    system: ImySystem[];
    gijvalue: number;
    totalgij: number;
    totalgijspent: number;
    oldphone: string[];
    userprofile: Iuserprofile;
    userprefix: Iuserprefix;
    permission: Ipermissions;
    enryptionkeys: Ienryptionkeys;
    constructor(username:string = ''){
        this.username=username;
        this._id=nano_time.now();
        this.gui=nano_time.now();        
    }

}

export interface Igijuser { // no refix --- remote
    _id: string;
    _rev: string;
    username: string;
    password: string;
    confirmpassword: string;
    phonenumber: string;
    gui: string;
    createddate: Date;
    lastupdate: Date;
    isactive: boolean;
    parents: Array<string>;
    roles: Array<Iroles>;
    logintoken: string;
    expirelogintoken: string;
    description: string;
    note: string;
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
    _id: string; _rev: string;
    owner: string;
    firstname: string;
    lastname: string;
    address: string;
    photo: Array<IObj>;
    description: string;
    remark: string;
    constructor(owner: string = '') {
        this.owner = owner;
        this._id=nano_time.now();
    }
}

export interface Iuserprofile {// private -- remote
    _id: string;
    _rev: string;
    owner: string;
    firstname: string;
    lastname: string;
    address: string;
    photo: Array<IObj>;
    description: string;
    remark: string;
}
export interface Irolelist { // public -- remote
    _id: string;
    _rev: string;
    rolename: string;
}
export interface IauthrorizedKeys { // private -- remote
    _rev: string;
    _id: string;
    description: string;
    authkeys: string;
    owner: string;
    assignedto: string;
    starttime: string;
    endtime: string;
    encryption: Ienryptionkeys;
}

export interface Iuserprefixauthorizedkeys { // private -- remote
    _id: string;
    _rev: string;
    userprefixid: string;
    authkeysid: string;
    authkeys: string;
    owner: string;
    assignedto: string;
}
export class Ouserprefix implements Iuserprefix { // private -- remote
    _id: string; _rev: string;
    prefixname: string;
    prefix: string;
    owner: string;
    serverurl:string;
    authorizedkeys: Array<IauthrorizedKeys>;
    assignedto: string;
    starttime: string;
    endtime: string;
    renewlist: Array<Iuserprefix>;
    constructor(prefixname: string = '', prefix: string = '', owner: string = '', assignedto: string = '') {
        this.prefixname = prefixname;
        this.prefix = prefix;
        this.owner = owner;
        this.authorizedkeys = new Array<IauthrorizedKeys>();
        this.assignedto = assignedto;
        this._id=nano_time.now();        
    }

}
export interface Iuserprefix { // private -- remote
    _id: string;
    _rev: string;
    prefixname: string;
    prefix: string;
    serverurl:string;
    owner: string;
    authorizedkeys: Array<IauthrorizedKeys>;
    assignedto: string;
    starttime: string;
    endtime: string;
    renewlist: Array<Iuserprefix>;
}
export interface ImemberRequest {
    _id: string;
    _rev: string;
    owner: string;
    requestedtime: string;
    touser: string;
    acceptedtime: string;
    denytime: string;
    reason: string;
    endtime: string;
}
export interface IpermissionAssigned {
    _id: string; _rev: string;
    permissionid: string;
    permissionlevel: string;
    assignedname: string;
    title: string;
    admin: string;
    memberaccepted: Array<ImemberRequest>;
    starttime: string;
    endtime: string;
}
export class OpermissionsAssigned implements IpermissionAssigned {
    _id: string; _rev: string;
    permissionid: string;
    permissionlevel: string;
    assignedname: string;
    starttime: string;
    endtime: string;
    title: string;
    admin: string;
    memberaccepted: Array<ImemberRequest>;
    constructor(permissionid: string = '', assignedname: string = '', permissionlevel: string = '') {
        this.permissionid = permissionid;
        this.assignedname = assignedname;
        this.permissionlevel = permissionlevel;
        this._id=nano_time.now();        
    }
}
export class Opermissions implements Ipermissions { // public -- remote
    _id: string; _rev: string;
    permissionname: string;
    permissionlevel: number;
    constructor(permissionname: string = '') {
        this.permissionname = permissionname;
        this._id=nano_time.now();
        
    }
}
export interface Ipermissions { // public -- remote
    _id: string;
    _rev: string;
    permissionname: string;
    permissionlevel: number;
}
export class Oencryptionkeys implements Ienryptionkeys { // private -- remote
    _id: string; _rev: string;
    keys: string;
    owner: string;
    isActive: string;
    startime: string;
    endtime: string;
    constructor(owner: string = '') {
        this.owner = owner;
        this._id=nano_time.now();
        
    }

}
export interface Ienryptionkeys { // private -- remote
    _id: string;
    _rev: string;
    keys: string;
    owner: string;
    isActive: string;
    startime: string;
    endtime: string;
}
export interface Iroles { // public --- remote
    _id: string;
    _rev: string;
    rolename: string;
    groupname: string;
    rolelevel: number;
    permission: Array<Ipermissions>;
    oldroles: Array<Iroles>;
    assignedtime: string;
    deassignedtime: string;
}
export class Oroles implements Iroles { // public -- remote
    _id: string; _rev: string;
    rolename: string;
    rolelevel: number;
    permission: Array<Ipermissions>;
    oldroles: Array<Iroles>;
    assignedtime: string;
    deassignedtime: string;
    groupname: string;
    constructor(rolename: string = '', groupname: string = '') {
        this.rolename = rolename;
        this._id=nano_time.now();
        
    }

}
export interface Iapprovement {
    _id: string;
    _rev: string;
    approvedby: string;
    approvedtime: string;
}
export class Oapprovement implements Iapprovement {
    _id: string;
    _rev: string;
    approvedby: string;
    approvedtime: string;
    constructor(approvedby: string = '') {
        this.approvedby = approvedby;

        this._id = nano_time.now();
        

    }
}
export class Odocument implements Idocument { // public --- remote
    _id: string;
    _rev: string;
    docname: string;
    owner: string;
    members: Array<IpermissionAssigned>;
    jobs: Array<Ijob>;
    description: string;
    createdtime: string;
    starttime: string;
    endtime: string;
    totalscore: number;
    iscompleted: boolean;
    endreason: string;
    status: string;
    referees: Array<string>;
    approved: Iapprovement;
    priority: string;
    attachedfile: Array<IObj>;
    scoreslist: Array<Iscores>;
    constructor(docname: string = '', owner: string = '') {
        this._id=nano_time.now();
        this.docname = docname;
        this.owner = owner;
        
    }
}
export interface Idocument { // public --- remote
    _id: string;
    _rev: string;
    docname: string;
    owner: string;
    members: Array<IpermissionAssigned>;
    jobs: Array<Ijob>;
    description: string;
    createdtime: string;
    starttime: string;
    endtime: string;
    totalscore: number;
    iscompleted: boolean;
    endreason: string;
    status: string;
    referees: Array<string>;
    approved: Iapprovement;
    priority: string;
    attachedfile: Array<IObj>;
    scoreslist: Array<Iscores>;
}
export interface Ijob {
    _id: string;
    _rev: string;
    jobname: string;
    description: string;
    members: Array<IpermissionAssigned>;
    createdtime: string;
    starttime: string;
    endtime: string;
    score: Iscores;
}
export class Ojob implements Ijob {
    _id: string;
    _rev: string;
    jobname: string;
    description: string;
    members: Array<IpermissionAssigned>;
    createdtime: string;
    starttime: string;
    endtime: string;
    score: Iscores;
    constructor(jobname: string = '') {

        this._id = nano_time.now();
        
    }
}

export class Oscores implements Iscores {
    _id: string;
    _rev: string;
    score: number;
    referee: string;
    status: string;
    createdtime: string;
    isold: boolean;
    constructor(score: number = 0) {
        this.score = score;

        this._id = nano_time.now();
        
    }
}
export interface Iscores {
    _id: string;
    _rev: string;
    score: number;
    referee: string;
    status: string;
    createdtime: string;
    isold: boolean;
}
export class OReport implements IReport {
    _id: string;
    _rev: string;
    createdtime: string;
    reportname: string;
    reportcont: string;
    createdby: string;
}


export interface IReport {
    _id: string;
    _rev: string;
    createdtime: string;
    reportname: string;
    reportcont: string;
    createdby: string;
}


export class Oconfig implements Iconfig{
    _rev: string;    _id: string;
    configname: string;
    value: string;
    key: string;
    createdtime: string;
    oldconfig: Iconfig[];
    constructor(configname:string = ''){
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
    name: string;
    arraybuffer: Blob;
    type: string;
    url: string;
    _id: string; _rev: string;
    constructor(name: string) {
        this.name = name;
        this._id=nano_time.now();   
    }
}

interface IObj { // public -- remote
    _id: string;
    _rev: string;
    name: string;
    arraybuffer: Blob;
    type: string;
    url: string;
}


































export interface IphoneObj {
    _id: string;
    _rev: string;
    command: string;
    secret: string;
}














export interface IloginObj {
    _id: string;
    _rev: string;
    command: string;
    client: any;
}
export interface IguiObj {
    _id: string;
    _rev: string;
    command: string;
    gui: string;
}
export interface IonlineObj {
    _id: string;
    _rev: string;
    command: string;
    client: {
        username: string;
        onlinetime: Date;
        system: string;
        login: Array<any>;
    };
}

export interface ItargetObj {
    '_deleted': boolean;
    '_id': string;
    '_rev': string;
    'gui': string;
    'targetid': string;
    'usergui': string;
    'username': string;
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
    _id: string;
    _rev: string;
    username: string;
    received: Date;
}
export interface IreadObj {
    _id: string;
    _rev: string;
    username: string;
    read: Date;
}
export interface ImsgObj {
    _id: string;
    _rev: string;
    gui: string;
    sender: string;
    content: string;
    msgtype: string;
    attached: Array<any>;
    sent: Date;
    received: Array<IreceivedObj>;
    read: Array<IreadObj>;
}