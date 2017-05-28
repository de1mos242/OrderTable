import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'ot-edit-paid-sum-dialog',
  templateUrl: './edit-paid-sum-dialog.component.html',
  styleUrls: [ './edit-paid-sum-dialog.component.css' ]
})
export class EditPaidSumDialogComponent implements OnInit {

  paidSumValue: string;

  constructor(@Optional() public dialogRef: MdDialogRef<EditPaidSumDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
    this.paidSumValue = data.initialValue;
  }

  ngOnInit() {
  }

}
