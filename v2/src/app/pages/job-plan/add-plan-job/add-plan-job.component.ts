import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-add-plan-job',
  templateUrl: './add-plan-job.component.html',
  styleUrls: ['./add-plan-job.component.scss']
})
export class AddPlanJobComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goblack(){
    this.router.navigate(['/pages/Plan-jobs'],{})
  }

}
