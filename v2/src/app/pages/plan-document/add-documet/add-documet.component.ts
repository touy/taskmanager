import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-add-documet',
  templateUrl: './add-documet.component.html',
  styleUrls: ['./add-documet.component.scss']
})
export class AddDocumetComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goblack(){
    this.router.navigate(['/pages/Plan-document-my'],{})
  }

}
