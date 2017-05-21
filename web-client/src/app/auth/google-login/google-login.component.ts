import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';

declare const gapi: any;


@Component({
  selector: 'ot-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: [ './google-login.component.css' ]
})
export class GoogleLoginComponent implements OnInit, AfterViewInit {

  public auth2: any;

  googleButtonId = 'glogin';

  @Output() onSuccessLogin = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById(this.googleButtonId));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (loggedInUser) => {
        console.log(loggedInUser);
        this.onSuccessLogin.emit(loggedInUser.Zi.access_token);

      }, function (error) {
        // alert(JSON.stringify(error, undefined, 2));
      });

  }

}
