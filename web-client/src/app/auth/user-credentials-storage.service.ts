import { Injectable } from '@angular/core';
import { UserCredentials } from './user-credentials.model';

@Injectable()
export class UserCredentialsStorageService {
  private static localStorageKey = 'userCredentials';

  constructor() {
  }

  loadStoredCredentials(): UserCredentials {
    const storedCredentials = localStorage.getItem(UserCredentialsStorageService.localStorageKey);
    if (storedCredentials != null) {
      return UserCredentials.fromString(storedCredentials);
    }
    return null;
  }

  saveStoredCredentials(credentials: UserCredentials) {
    localStorage.setItem(UserCredentialsStorageService.localStorageKey, credentials.toString());
  }

}
