import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class AlertsService {

  constructor(private mdSnackBar: MdSnackBar) { }

  showError(msg: string) {
    const alert = this.mdSnackBar.open(msg, 'X');
    alert.onAction().toPromise().then(() => alert.dismiss());
  }

}
