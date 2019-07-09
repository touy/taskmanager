import { Irolelist, Iroles } from './interface';
import { emit } from 'pouchdb';
export class mFuncs{
    static readonly funcNames={
        searchRoleListByNameFunc:'searchRoleListByNameFunc',
        searchRoleByRoleNameFunc:'searchRoleByRoleNameFunc',
        searchRoleByRoleGroupNameFunc:'searchRoleByRoleGroupNameFunc',
        searchRoleByRoleOwnerNameFunc: 'searchRoleByRoleOwnerNameFunc',
        searchRoleByRoleParentIdFunc:'searchRoleByRoleParentIdFunc'
    };
    static  searchRoleListByNameFunc(doc: Irolelist) {
        if (doc.rolename) {
            emit(doc.rolename);
        }
    }    
    static  searchRoleByRoleNameFunc(doc: Iroles) {
        if (doc.rolename) {
            emit(doc.rolename);
        }
    } 
    static  searchRoleByRoleGroupNameFunc(doc: Iroles) {
        if (doc.groupname) {
            emit(doc.groupname);
        }
    } 
    static  searchRoleByRoleOwnerNameFunc(doc: Iroles) {
        if (doc.owner) {
            emit(doc.owner);
        }
    } 
    static  searchRoleByRoleParentIdFunc(doc: Iroles) {
        if (doc.parentroleid) {
            emit(doc.parentroleid);
        }
    } 










    

}
