import { Injectable } from '@angular/core';
import { HttpProviderService } from './http-provider.service';

import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { OAuthToken } from '../models/auth/oauth-token.model';

@Injectable()
export class AuthBackendService {

  constructor(private httpProviderService: HttpProviderService) {
  }

  tryLogin(username: string, password: string): Observable<string> {
    return this.httpProviderService.post('/api-token-auth/', { username, password }).map(data => data.token);
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

}
