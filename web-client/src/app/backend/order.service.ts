import { Injectable } from '@angular/core';
import { HttpProviderService } from './http-provider.service';
import { Observable } from 'rxjs/Observable';
import { OrderModel } from '../models/order-event.model';

import 'rxjs/add/operator/toPromise';
import { OrderGroupedPosition } from '../models/order-grouped-position.model';
import { CustomerStats } from '../models/customer-stats.model';

@Injectable()
export class OrderService {

  private resourceUrl = '/order-events/';

  constructor(protected httpProviderService: HttpProviderService) {
  }

  getList(): Observable<OrderModel[]> {
    return this.httpProviderService.get(this.resourceUrl).map(this.extractListResult);
  }

  extractListResult(data: any): OrderModel[] {
    const results: any[] = data.results || [];
    return results.map(OrderModel.fromJson);
  }

  create(name: string): Promise<OrderModel> {
    const order = new OrderModel();
    order.name = name;
    order.rateCards = [];
    return this.httpProviderService.post(this.resourceUrl, order.toJson()).map(OrderModel.fromJson).toPromise();
  }

  getOrder(id: number): Observable<OrderModel> {
    return this.httpProviderService.get(`${this.resourceUrl}${id}/`).map(OrderModel.fromJson);
  }

  update(orderModel: OrderModel): Promise<OrderModel> {
    return this.httpProviderService.put(`${this.resourceUrl}${orderModel.id}/`, orderModel.toJson())
               .map(OrderModel.fromJson)
               .toPromise();
  }

  getGroupedPositions(orderModel: OrderModel): Observable<OrderGroupedPosition[]> {
    return this.httpProviderService.get(`${this.resourceUrl}${orderModel.id}/groued_positions`)
               .map(HttpProviderService.extractListMap(OrderGroupedPosition.fromJson));
  }

  getCustomerStats(orderModel: OrderModel): Observable<CustomerStats[]> {
    return this.httpProviderService.get(`${this.resourceUrl}${orderModel.id}/customers_stats`)
               .map(HttpProviderService.extractListMap(CustomerStats.fromJson));
  }

  requestInvitationToken(id: number): Promise<string> {
    return this.httpProviderService.post(`${this.resourceUrl}${id}/request_invitation_token/`, { id })
               .map(data => data.token).toPromise();
  }

  inviteParticipant(id: number, token: string): Promise<any> {
    return this.httpProviderService.put(`${this.resourceUrl}${id}/invite/`, { token }).toPromise();
  }
}
