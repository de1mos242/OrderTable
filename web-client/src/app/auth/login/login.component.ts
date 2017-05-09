import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { MdSnackBar, MdSnackBarRef, SimpleSnackBar } from '@angular/material';

@Component({
  selector: 'ot-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent extends BaseComponent implements OnInit {

  username: string;
  password: string;
  private snackBarRef: MdSnackBarRef<SimpleSnackBar>;

  constructor(private authService: AuthService,
              private router: Router,
              private mdSnackBar: MdSnackBar) {
    super();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.navigateBack();
    }
  }

  onSubmit() {
    const subscription = this.authService.tryLogin(this.username, this.password).subscribe(isAuthorized => {
      if (isAuthorized) {
        this.authService.navigateBack();
      } else {
        this.snackBarRef = this.mdSnackBar.open('Ошибка авторизации', 'X');
        this.subscribed(this.snackBarRef.onAction().subscribe(() => this.snackBarRef.dismiss()));
      }
    });
    this.subscribed(subscription);
  }

}
