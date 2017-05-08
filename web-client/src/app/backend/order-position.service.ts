import { Injectable } from '@angular/core';
import { HttpProviderService } from './http-provider.service';
import { OrderPosition } from '../models/order-position.model';

@Injectable()
export class OrderPositionService {

  private resourceUrl = '/order-positions/';

  constructor(private httpService: HttpProviderService) {
  }

  getFilteredList(filter: object): Promise<OrderPosition[]> {
    return this.httpService.get(this.resourceUrl, { search: filter }).map(this.extractList).toPromise();
  }

  private extractList(data: any): OrderPosition[] {
    const results = data.results || [];
    return results.map(OrderPosition.fromJson);
  }

  addPosition(orderPosition: OrderPosition): Promise<OrderPosition> {
    return this.httpService.post(this.resourceUrl, orderPosition.toJson()).map(OrderPosition.fromJson).toPromise();
  }

  updatePosition(orderPosition: OrderPosition): Promise<OrderPosition> {
    return this.httpService.put(`${this.resourceUrl}${orderPosition.id}/`, orderPosition.toJson())
               .map(OrderPosition.fromJson)
               .toPromise();
  }

  removePosition(position: OrderPosition): Promise<boolean> {
    return this.httpService.delete(`${this.resourceUrl}${position.id}/`).map(data => true).toPromise();
  }
}
