import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { AlertsService } from '../../shared/alerts.service';

@Component({
  selector: 'ot-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private authService: AuthService,
              private alerts: AlertsService) {
    super();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.navigateBack();
    }
  }

  tryLogin(username: string, password: string) {
    this.authService.tryLogin(username, password).then(isAuthorized => {
      if (isAuthorized) {
        this.authService.navigateBack();
      } else {
        this.alerts.showError('Ошибка авторизации');
      }
    });
  }

  onSuccessGoogleLogin(token: string) {
    this.authService.tryLoginByGoogle(token).then(isAuthorized => {
      if (isAuthorized) {
        this.authService.navigateBack();
      } else {
        this.alerts.showError('Ошибка авторизации');
      }
    }).catch(error => this.alerts.showError(error));
  }

}
