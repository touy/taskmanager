import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goblack(){
    this.router.navigate(['/pages/user'],{})
  }

}
