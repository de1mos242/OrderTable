import { Injectable } from '@angular/core';
import { HttpProviderService } from './http-provider.service';
import { Observable } from 'rxjs/Observable';
import { OrderModel } from '../models/order-event.model';

import 'rxjs/add/operator/toPromise';

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
    return this.httpProviderService.post(this.resourceUrl, { name }).map(OrderModel.fromJson).toPromise();
  }

  getOrder(id: number): Observable<OrderModel> {
    return this.httpProviderService.get(this.resourceUrl + id).map(OrderModel.fromJson);
  }
}
