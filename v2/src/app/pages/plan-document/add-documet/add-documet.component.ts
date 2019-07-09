import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ModleMenberComponent } from '../../project-jobs/modle-menber/modle-menber.component';
import { ModleJobsComponent } from '../../project-jobs/modle-jobs/modle-jobs.component';

@Component({
  selector: 'ngx-add-documet',
  templateUrl: './add-documet.component.html',
  styleUrls: ['./add-documet.component.scss']
})
export class AddDocumetComponent implements OnInit {

  constructor(private dialogService: NbDialogService,private router: Router) { }

  ngOnInit() {
  }

  goblack(){
    this.router.navigate(['/pages/Plan-document-my'],{})
  }

  addmember(){
    let dlg = this.dialogService.open(ModleMenberComponent, {
     
    });

    dlg.onClose.subscribe(result => {
      //this.loadUserList();
    });
  }

  
  addjobs(){
    let dlg = this.dialogService.open(ModleJobsComponent, {
     
    });

    dlg.onClose.subscribe(result => {
      //this.loadUserList();
    });
  }

}
