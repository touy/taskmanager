import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-jobofday-edit',
  templateUrl: './jobofday-edit.component.html',
  styleUrls: ['./jobofday-edit.component.scss']
})
export class JobofdayEditComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goblack(){
    this.router.navigate(['/pages/jobs_of_day'],{})
  }

}
