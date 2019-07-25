import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  score(){
    this.router.navigate(['/pages/Score-Add'],{})
  }

}
