import { Injectable, OnInit } from '@angular/core';
import { AuthBackendService } from '../backend/auth-backend.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { UserCredentials } from './user-credentials.model';
import { UserCredentialsStorageService } from './user-credentials-storage.service';

@Injectable()
export class AuthService implements OnInit {
  private currentUserCredentials: UserCredentials = null;
  redirectUrl: string;

  constructor(private authBackendService: AuthBackendService,
              private userCredentialsStorage: UserCredentialsStorageService) {
  }

  ngOnInit(): void {
    this.reloadCredentials();
  }

  private reloadCredentials() {
    const storedCredentials = this.userCredentialsStorage.loadStoredCredentials();
    if (storedCredentials != null) {
      this.currentUserCredentials = storedCredentials;
    }
  }

  isLoggedIn(): boolean {
    if (this.currentUserCredentials == null) {
      this.reloadCredentials();
    }
    return this.currentUserCredentials !== null;
  }

  tryLogin(username: string, password: string): Observable<boolean> {
    return this.authBackendService.tryLogin(username, password)
               .do(token => this.saveCredentials(username, token)).map(data => {
        return !!data;
      }).catch(data => Observable.of(false));
  }

  private saveCredentials(username: string, token: string) {
    this.currentUserCredentials = new UserCredentials();
    this.currentUserCredentials.username = username;
    this.currentUserCredentials.token = token;
    this.userCredentialsStorage.saveStoredCredentials(this.currentUserCredentials);
  }
}
