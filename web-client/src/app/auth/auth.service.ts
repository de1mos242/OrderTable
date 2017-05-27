import { Injectable } from '@angular/core';
import { AuthBackendService } from '../backend/auth-backend.service';
import { Observable } from 'rxjs/Observable';
import { UserCredentials } from './user-credentials.model';
import { UserCredentialsStorageService } from './user-credentials-storage.service';
import { User } from '../models/user.model';

import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { OAuthToken } from '../models/auth/oauth-token.model';
import { isNullOrUndefined } from 'util';

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

  tryLogin(username: string, password: string): Promise<boolean> {
    return this.authBackendService.tryLogin(username, password)
               .then(authToken => {
                 this.saveOAuthCredentials(authToken);
                 return this.refreshCurrentUser().then();

               }).catch(() => false);
  }

  logout() {
    this.resetCredentials();
    this.refreshCurrentUser();
    this.router.navigate([ '/' ]);
  }

  refreshTokenIfNeeded(): Promise<string> {
    if (this.currentUserCredentials != null && this.isTokenActual(this.currentUserCredentials)) {
      if (this.isTokenExpired(this.currentUserCredentials)) {
        return this.refreshToken().then(() => this.currentUserCredentials.token);
      } else {
        return Promise.resolve(this.currentUserCredentials.token);
      }
    }
    Promise.resolve('');
  }

  private resetCredentials() {
    this.currentUserCredentials = null;
    this.userCredentialsStorage.wipeStoredCredentials();
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

  private refreshCurrentUser(): Promise<boolean> {
    if (this.currentUserCredentials != null && this.isTokenActual(this.currentUserCredentials)) {
      if (this.isTokenExpired(this.currentUserCredentials)) {
        return this.refreshToken();
      }
      return this.authBackendService.getCurrentUser().toPromise().then(user => {
        this.currentUser.next(user);
      }).then(() => true);
    } else {
      this.resetCredentials();
      this.currentUser.next(null);
      return Promise.resolve(false);
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
      return this.tryLogin(username, password);
    });
  }

  navigateBack() {
    const redirect = this.redirectUrl ? this.redirectUrl : '/';
    this.redirectUrl = null;
    this.router.navigateByUrl(redirect);
  }

  tryLoginByGoogle(token: string): Promise<boolean> {
    return this.authBackendService.tryLoginByGoogle(token).then(authToken => {
      this.saveOAuthCredentials(authToken);
      this.refreshCurrentUser();
      return true;
    });
  }

  private saveOAuthCredentials(authToken: OAuthToken) {
    this.currentUserCredentials = new UserCredentials();
    this.currentUserCredentials.tokenType = authToken.token_type;
    this.currentUserCredentials.token = authToken.access_token;
    this.currentUserCredentials.refreshToken = authToken.refresh_token;
    this.currentUserCredentials.expiresIn = authToken.expires_in;
    this.currentUserCredentials.acquiredAt = new Date().getTime() / 1000;
    this.userCredentialsStorage.saveStoredCredentials(this.currentUserCredentials);
  }

  private isTokenActual(currentUserCredentials: UserCredentials): boolean {
    if (isNullOrUndefined(currentUserCredentials.refreshToken)) {
      return false;
    }
    if (isNullOrUndefined(currentUserCredentials.expiresIn)) {
      return false;
    }
    return true;
  }

  private isTokenExpired(currentUserCredentials: UserCredentials): boolean {
    const currentTime = new Date().getTime() / 1000;
    if (currentUserCredentials.acquiredAt + currentUserCredentials.expiresIn <= currentTime) {
      return true;
    }
    return false;
  }

  private refreshToken(): Promise<boolean> {
    return this.authBackendService.refreshToken(this.currentUserCredentials.refreshToken).then(authToken => {
      this.saveOAuthCredentials(authToken);
      return this.refreshCurrentUser();
    });
  }
}
