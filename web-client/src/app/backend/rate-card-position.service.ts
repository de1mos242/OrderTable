import { Injectable } from '@angular/core';
import { RateCardPosition } from '../models/rate-card-position.model';
import { HttpProviderService } from './http-provider.service';

@Injectable()
export class RateCardPositionService {

  private resourceUrl = '/rate-cards-positions/';

  constructor(private httpProvider: HttpProviderService) {
  }

  getFilteredList(filter: object): Promise<RateCardPosition[]> {
    return this.httpProvider.get(this.resourceUrl, { search: filter })
               .map(HttpProviderService.extractListMap(RateCardPosition.fromJson))
               .toPromise();
  }
}
