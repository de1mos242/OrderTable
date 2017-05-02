import { Injectable } from '@angular/core';
import { HttpProviderService } from './http-provider.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthBackendService {

  constructor(private httpProviderService: HttpProviderService) {
  }

  tryLogin(username: string, password: string): Observable<string> {
    return this.httpProviderService.post('/api-token-auth/', { username, password }).map(data => data.token);
  }
}
