import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent  {

  @Input() title: string;
  @Input() detell: string;
  constructor(protected ref: NbDialogRef<ModalComponent>) {}

  close() {
    this.ref.close();
  }

}


