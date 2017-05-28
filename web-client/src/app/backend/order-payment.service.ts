import { Injectable } from '@angular/core';
import { HttpProviderService } from './http-provider.service';
import { OrderPayment } from '../models/order-payment.model';

@Injectable()
export class OrderPaymentService {

  private resourceUrl = '/order-payments/';

  constructor(private httpService: HttpProviderService) {
  }

  getFilteredList(filter: object): Promise<OrderPayment[]> {
    return this.httpService.get(this.resourceUrl, { search: filter }).map(this.extractList).toPromise();
  }

  private extractList(data: any): OrderPayment[] {
    const results = data.results || [];
    return results.map(OrderPayment.fromJson);
  }

  setPayment(orderPayment: OrderPayment): Promise<OrderPayment> {
    return this.httpService.post(this.resourceUrl, orderPayment.toJson()).map(OrderPayment.fromJson).toPromise();
  }

  updatePosition(orderPosition: OrderPayment): Promise<OrderPayment> {
    return this.httpService.put(`${this.resourceUrl}${orderPosition.id}/`, orderPosition.toJson())
               .map(OrderPayment.fromJson)
               .toPromise();
  }

  removePosition(position: OrderPayment): Promise<boolean> {
    return this.httpService.delete(`${this.resourceUrl}${position.id}/`).map(data => true).toPromise();
  }
}
