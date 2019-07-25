import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Igijuser, Ogijuser, nano_time, MyDataBaseNames, Irolelist, Orolelist } from '../../interface';
import {ModalUserRoleComponent} from './modal-user-roles/modal-user-roles.component';
@Component({
  selector: 'ngx-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  constructor(private dialogService: NbDialogService, private router: Router,private _location:Location) {
    
   }

  ngOnInit() {
  }

}
