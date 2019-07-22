import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import pouchdb from 'pouchdb';
import { NbDialogService } from '@nebular/theme';
import { ModleMenberComponent } from '../../project-jobs/modle-menber/modle-menber.component';
import { ModleJobsComponent } from '../../project-jobs/modle-jobs/modle-jobs.component';
import { Idocument, Odocument, Igijuser, MyDataBaseNames } from '../../../interface';

@Component({
  selector: 'ngx-add-documet',
  templateUrl: './add-documet.component.html',
  styleUrls: ['./add-documet.component.scss']
})
export class AddDocumetComponent implements OnInit {
  myDate = Date.now();
  private db: PouchDB.Database<{}>;
  private Usertable: PouchDB.Database<{}>;
  remoteCouch = 'http://admin:admin@localhost:5984/job-';


  public strFrom = "";
  public params = {};
  public js: any;
  Doc: Idocument;
  _selectedDoc: Idocument;
  timenow: Date = new Date();

  constructor(private dialogService: NbDialogService, private router: Router, public _Location: Location, private route: ActivatedRoute) {
    this.Doc = new Odocument();
    this.db = new pouchdb(MyDataBaseNames.dbdoc);


  }

  ngOnInit() {

  }

  getData() {
    this.js = JSON.parse(localStorage.getItem('js'));
    this.strFrom = this.js.from;
  }
  getParams() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // {order: "popular"}
        this.params = params;
      });
  }




  save() {
    console.log(this.Doc);
    try {

      this.Doc._id = (Math.random() * 1000000) + '';
      console.log('add new');

      this.insert();


    }
    catch (e) {

    }



  }


  insert() {
    this._selectedDoc.createdtime = this.timenow + '';
    this.Doc.members
    this.db.put(this.Doc, { force: true }, (err, res) => {
      if (err) {
        console.log('err after put'
        );
        console.log(err);
      } else {
        console.log('after put');
        console.log(res);
      }
    });
  }


  deletejob() {
    this.db.remove(this._selectedDoc).then(res => {

    }).catch(err => {

    })
  }

  goblack() {
    this.router.navigate(['/pages/Plan-document-my'], {})
  }

  cratejob() {
    this.router.navigate(['/pages/Add-Plan-jobs'], {})
  }

  addmember() {
    let dlg = this.dialogService.open(ModleMenberComponent, {

    });

    dlg.onClose.subscribe(result => {
      //this.loadUserList();
    });
  }


  addjobs() {
    let dlg = this.dialogService.open(ModleJobsComponent, {

    });

    dlg.onClose.subscribe(result => {
      //this.loadUserList();
    });
  }

}
