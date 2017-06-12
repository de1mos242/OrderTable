import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { RateCardPosition } from '../../../models/rate-card-position.model';

@Component({
  selector: 'ot-add-order-position-dialog',
  templateUrl: './add-order-position-dialog.component.html',
  styleUrls: ['./add-order-position-dialog.component.css']
})
export class AddOrderPositionDialogComponent implements OnInit {
  dialogParams: {amount: number, position: RateCardPosition, additions: string};

  constructor(@Optional() public dialogRef: MdDialogRef<AddOrderPositionDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
    this.dialogParams = data.initialValue;
  }

  ngOnInit() {
  }

}
