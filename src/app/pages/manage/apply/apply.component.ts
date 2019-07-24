import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  comfirm(){
    this.router.navigate(['/pages/confirm'],{})
  }

  cancel(){
    
  }

}
