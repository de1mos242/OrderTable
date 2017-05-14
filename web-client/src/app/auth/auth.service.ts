import { Injectable } from '@angular/core';
import { AuthBackendService } from '../backend/auth-backend.service';
import { Observable } from 'rxjs/Observable';
import { UserCredentials } from './user-credentials.model';
import { UserCredentialsStorageService } from './user-credentials-storage.service';
import { User } from '../models/user.model';

import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private currentUserCredentials: UserCredentials = null;
  redirectUrl: string;
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private currentUserObservable = this.currentUser.asObservable();

  constructor(private authBackendService: AuthBackendService,
              private userCredentialsStorage: UserCredentialsStorageService,
              private router: Router) {
    this.init();
  }

  isLoggedIn(): boolean {
    if (this.currentUserCredentials == null) {
      this.reloadCredentials();
    }
    return this.currentUserCredentials !== null;
  }

  tryLogin(username: string, password: string): Observable<boolean> {
    return this.authBackendService.tryLogin(username, password)
               .do(token => this.saveCredentials(token))
               .do(token => this.refreshCurrentUser())
               .map(data => {
                 return !!data;
               })
               .catch(data => Observable.of(false));
  }

  logout() {
    this.currentUserCredentials = null;
    this.userCredentialsStorage.wipeStoredCredentials();
    this.refreshCurrentUser();
    this.router.navigate([ '/' ]);
  }

  onAuthUpdate(): Observable<User> {
    return this.currentUserObservable;
  }

  private init(): void {
    this.reloadCredentials();
    this.refreshCurrentUser();
  }

  private reloadCredentials() {
    const storedCredentials = this.userCredentialsStorage.loadStoredCredentials();
    if (storedCredentials != null) {
      this.currentUserCredentials = storedCredentials;
    }
  }

  private refreshCurrentUser() {
    if (this.currentUserCredentials != null) {
      this.authBackendService.getCurrentUser().toPromise().then(user => {
        this.currentUser.next(user);
      })
    } else {
      this.currentUser.next(null);
    }
  }

  private saveCredentials(token: string, tokenType: string = 'Token') {
    this.currentUserCredentials = new UserCredentials();
    this.currentUserCredentials.tokenType = tokenType;
    this.currentUserCredentials.token = token;
    this.userCredentialsStorage.saveStoredCredentials(this.currentUserCredentials);
  }

  tryRegister(username: string, password: string): Promise<boolean> {
    return this.authBackendService.tryRegister(username, password).then(registrationData => {
      return this.tryLogin(username, password).toPromise();
    });
  }

  navigateBack() {
    const redirect = this.redirectUrl ? this.redirectUrl : '/';
    this.redirectUrl = null;
    this.router.navigate([ redirect ]);
  }

  tryLoginByGoogle(token: string): Promise<boolean> {
    return this.authBackendService.tryLoginByGoogle(token).then(authToken => {
      this.saveCredentials(authToken.access_token, authToken.token_type);
      this.refreshCurrentUser();
      return true;
    });
  }
}
