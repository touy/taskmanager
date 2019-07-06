
import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import {Igijuser,Ogijuser,nano_time, MyDataBaseNames} from '../../../interface';

@Component({
  selector: 'ngx-modle-menber',
  templateUrl: './modle-menber.component.html',
  styleUrls: ['./modle-menber.component.scss']
})
export class ModleMenberComponent  {

  constructor(protected ref: NbDialogRef<ModleMenberComponent> ,public _Location:Location,public router:Router) { }

  ngOnInit() {
  }

  
  close() {
    this.ref.close({ref:'OK'});
    //this.usercom.loadUserList();
    

  }

}
