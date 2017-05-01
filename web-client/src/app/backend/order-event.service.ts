import { Injectable } from '@angular/core';
import { HttpProviderService } from './http-provider.service';
import { Observable } from 'rxjs/Observable';
import { OrderEvent } from '../models/order-event.model';

@Injectable()
export class OrderEventService {

  constructor(protected httpProviderService: HttpProviderService) { }

  getList(): Observable<OrderEvent[]> {
    return this.httpProviderService.get('/order-events/').map(this.extractListResult);
  }

  extractListResult(data: any): OrderEvent[] {
    const results: any[] = data.results || [];
    return results.map(OrderEvent.fromJson);
  }
}
