import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-jobofday-add',
  templateUrl: './jobofday-add.component.html',
  styleUrls: ['./jobofday-add.component.scss']
})
export class JobofdayAddComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goblack(){
    this.router.navigate(['/pages/jobs_of_day'],{})
  }

}
