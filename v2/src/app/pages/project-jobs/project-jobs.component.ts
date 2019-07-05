import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-project-jobs',
  templateUrl: './project-jobs.component.html',
  styleUrls: ['./project-jobs.component.scss']
})
export class ProjectJobsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  add(){
    this.router.navigate(['/pages/Plan-document-Add'],{})

   
  }

}
