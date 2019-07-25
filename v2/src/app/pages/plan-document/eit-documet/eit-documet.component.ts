import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-eit-documet',
  templateUrl: './eit-documet.component.html',
  styleUrls: ['./eit-documet.component.scss']
})
export class EitDocumetComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goblack(){
    this.router.navigate(['/pages/Plan-document-my'],{})
  }


}
