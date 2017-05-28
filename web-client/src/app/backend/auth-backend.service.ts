import { Injectable } from '@angular/core';
import { HttpProviderService } from './http-provider.service';

import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { OAuthToken } from '../models/auth/oauth-token.model';
import { Headers } from '@angular/http';

@Injectable()
export class AuthBackendService {

  constructor(private httpProviderService: HttpProviderService) {
  }

  tryLogin(username: string, password: string): Promise<OAuthToken> {
    const authObject = {
      grant_type: 'password',
      client_id: 'OrdersTableOAuthApp',
      username,
      password
    };
    return this.httpProviderService.post('/auth/token', {}, { search: authObject }).toPromise();
  }

  getByUsername(username: string): Observable<User> {
    return this.httpProviderService.get(`/users/by-username/${username}/`).map(User.fromJson);
  }

  tryRegister(username: string, password: string): Promise<any> {
    return this.httpProviderService.post('/security-users/', { username, password }).toPromise();
  }

  tryLoginByGoogle(token: string): Promise<OAuthToken> {
    const authObject = {
      grant_type: 'convert_token',
      client_id: 'OrdersTableOAuthApp',
      backend: 'google-oauth2',
      token: token,
    };
    return this.httpProviderService.post('/auth/convert-token', {}, { search: authObject }).toPromise();
  }

  getCurrentUser(): Observable<User> {
    return this.httpProviderService.get(`/users/current_user/`).map(User.fromJson);
  }

  refreshToken(refreshToken: string): Promise<OAuthToken> {
    const authObject = {
      grant_type: 'refresh_token',
      client_id: 'OrdersTableOAuthApp',
      refresh_token: refreshToken,
    };
    const headers = new Headers();
    headers.append('Authorization', ''); // do not send outdated auth
    return this.httpProviderService.post('/auth/token', {}, { search: authObject, headers: headers }).toPromise();
  }
}
