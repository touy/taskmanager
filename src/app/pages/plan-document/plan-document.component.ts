import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-plan-document',
  templateUrl: './plan-document.component.html',
  styleUrls: ['./plan-document.component.scss']
})
export class PlanDocumentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  add(){
    this.router.navigate(['/pages/Plan-document-Add'],{})
  }

  edit(){
    this.router.navigate(['/pages/Plan-document-Edit'],{ queryParams: { id: 1 ,save:true} })
  }


}
