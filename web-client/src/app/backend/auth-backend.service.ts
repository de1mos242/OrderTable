import { Injectable } from '@angular/core';
import { HttpProviderService } from './http-provider.service';

import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()
export class AuthBackendService {

  constructor(private httpProviderService: HttpProviderService) {
  }

  tryLogin(username: string, password: string): Observable<string> {
    return this.httpProviderService.post('/api-token-auth/', { username, password }).map(data => data.token);
  }

  getByUsername(username: string): Observable<User> {
    return this.httpProviderService.get('/users/by-username/' + username).map(User.fromJson);
  }
}
