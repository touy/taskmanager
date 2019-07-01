import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-job-plan',
  templateUrl: './job-plan.component.html',
  styleUrls: ['./job-plan.component.scss']
})
export class JobPlanComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  add(){
    this.router.navigate(['/pages/Add-Plan-jobs'],{})
  }

  edit(){
    this.router.navigate(['/pages/Edit-Plan-jobs'],{ queryParams: { id: 1 ,save:true} })
  }


}
