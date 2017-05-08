import { Injectable } from '@angular/core';
import { HttpProviderService } from './http-provider.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  private resourceUrl = '/users/';

  constructor(private httpProvider: HttpProviderService) { }

  getUsers(): Observable<User[]> {
    return this.httpProvider.get(this.resourceUrl).map(HttpProviderService.extractListMap(User.fromJson));
  }
}
