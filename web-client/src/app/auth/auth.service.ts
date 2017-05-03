import { Injectable } from '@angular/core';
import { AuthBackendService } from '../backend/auth-backend.service';
import { Observable } from 'rxjs/Observable';
import { UserCredentials } from './user-credentials.model';
import { UserCredentialsStorageService } from './user-credentials-storage.service';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  private currentUserCredentials: UserCredentials = null;
  redirectUrl: string;
  currentUser: Subject<User> = new Subject<User>();

  constructor(private authBackendService: AuthBackendService,
              private userCredentialsStorage: UserCredentialsStorageService) {
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
               .do(token => this.saveCredentials(username, token))
               .do(token => this.refreshCurentUser())
               .map(data => {
                 return !!data;
               })
               .catch(data => Observable.of(false));
  }

  logout() {
    this.currentUserCredentials = null;
    this.userCredentialsStorage.wipeStoredCredentials();
    this.refreshCurentUser();
  }

  onAuthUpdate(): Observable<User> {
    return this.currentUser.asObservable();
  }

  private init(): void {
    this.reloadCredentials();
    this.refreshCurentUser();
  }

  private reloadCredentials() {
    const storedCredentials = this.userCredentialsStorage.loadStoredCredentials();
    if (storedCredentials != null) {
      this.currentUserCredentials = storedCredentials;
    }
  }

  private refreshCurentUser() {
    if (this.currentUserCredentials != null) {
      this.authBackendService.getByUsername(this.currentUserCredentials.username).toPromise().then(user => {
        this.currentUser.next(user);
      })
    } else {
      this.currentUser.next(null);
    }
  }

  private saveCredentials(username: string, token: string) {
    this.currentUserCredentials = new UserCredentials();
    this.currentUserCredentials.username = username;
    this.currentUserCredentials.token = token;
    this.userCredentialsStorage.saveStoredCredentials(this.currentUserCredentials);
  }
}
