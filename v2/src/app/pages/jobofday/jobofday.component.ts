import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-jobofday',
  templateUrl: './jobofday.component.html',
  styleUrls: ['./jobofday.component.scss']
})
export class JobofdayComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  user_add(){
    this.router.navigate(['/pages/jobs_of_day_add'],{})
  }

  user_edit(){
    this.router.navigate(['/pages/jobs_of_day_edit'],{ queryParams: { id: 1 ,save:true} })
  }

}
