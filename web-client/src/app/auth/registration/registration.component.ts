import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertsService } from '../../shared/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ot-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.css' ]
})
export class RegistrationComponent implements OnInit {

  username: string;
  password: string;
  password_check: string;

  constructor(private authService: AuthService, private alerts: AlertsService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.username === '') {
      this.alerts.showError('Укажите имя пользвоателя');
      return;
    }
    if (this.password === '') {
      this.alerts.showError('Введите пароль');
      return;
    }
    if (this.password !== this.password_check) {
      this.alerts.showError('Пароли не совпадают');
      return;
    }

    this.authService.tryRegister(this.username, this.password)
        .then(res => this.authService.navigateBack())
        .catch(err => this.alerts.showError(err));
  }

}
