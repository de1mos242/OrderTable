import { Injectable } from '@angular/core';
import { HttpProviderService } from './http-provider.service';
import { Observable } from 'rxjs/Observable';
import { RateCard } from '../models/rate-card.model';

@Injectable()
export class RateCardService {

  private static readonly resourceUrl = '/rate-cards/';

  constructor(private httpProvider: HttpProviderService) {
  }

  getList(): Observable<RateCard[]> {
    return this.httpProvider.get(RateCardService.resourceUrl).map(this.extractList);
  }

  getById(id: number): Observable<RateCard> {
    return this.httpProvider.get(`${RateCardService.resourceUrl}${id}/`).map(RateCard.fromJson);
  }

  create(rateCardName: string) {
    const rateCard = new RateCard();
    rateCard.name = rateCardName;
    rateCard.positions = [];
    return this.httpProvider.post(RateCardService.resourceUrl, rateCard).map(RateCard.fromJson).toPromise();
  }

  update(rateCard: RateCard) {
    return this.httpProvider.put(`${RateCardService.resourceUrl}${rateCard.id}/`, rateCard)
               .map(RateCard.fromJson)
               .toPromise();
  }

  getByOrder(orderId: number): Promise<RateCard[]> {
    return this.httpProvider.get(RateCardService.resourceUrl, { search: { order_id: orderId } })
               .map(this.extractList)
               .toPromise();
  }

  private extractList(data: any): RateCard[] {
    const results = data.results || [];
    return results.map(RateCard.fromJson);
  }

  getFilteredList(query: object) {
    return this.httpProvider.get(RateCardService.resourceUrl, { search: query }).map(this.extractList);
  }
}
