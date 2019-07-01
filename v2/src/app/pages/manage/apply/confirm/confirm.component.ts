import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goblack(){
    this.router.navigate(['/pages/Apply'],{})
  }

}
