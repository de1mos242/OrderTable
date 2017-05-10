import { Pipe, PipeTransform } from '@angular/core';
import { OrderModel, OrderStatus } from '../../models/order-event.model';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(value: OrderStatus): string {
    return OrderModel.getStatusLabel(value);
  }

}
